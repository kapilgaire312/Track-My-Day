import Activity from "@/lib/models/activity-model";
import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb"
import { NextResponse } from "next/server";
import findCategory from "./findCategory";



export async function POST(req) {

  const data = await req.json()
  console.log(data)

  try {

    const categorizedActivities = await findCategory(data.activities, data.categoryList)

    await dbConnect();
    let userActivities = await Activity.findOne({ userId: data.userId })
    if (!userActivities) {
      const activities = await Activity.create(
        {
          activities: [{ date: data.date, activity: categorizedActivities }],
          userId: data.userId
        }
      )

      const user = await User.findById(data.userId)
      user.activities = activities._id
      await user.save()

      return NextResponse.json({ msg: 'created new activities' }, { status: 201 })
    }


    const existingActivity = userActivities.activities.find(item => item.date === data.date)

    if (existingActivity) {
      existingActivity.activity = categorizedActivities
    }
    else {
      userActivities.activities.push({
        date: data.date,
        activity: categorizedActivities
      })
    }

    await userActivities.save();
    return NextResponse.json({ msg: categorizedActivities }, { status: 201 })


  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: 'failed to save activities.' }, { status: 500 })

  }

}

