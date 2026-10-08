import Activity from "@/lib/models/activity-model";
import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import { NextResponse } from "next/server";
import findCategory from "@/utils/findCategory";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const session = await auth();
    const data = await req.json();
    const userId = session?.user?.email;
    if (!userId || userId !== data.userId) {
      return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ msg: "User not found." }, { status: 404 });
    }

    const categorizedActivities = await findCategory(
      data.activities,
      user.categoryList,
    );
 
    let userActivities = await Activity.findOne({ userId: data.userId });
    if (!userActivities) {
      const activities = await Activity.create({
        activities: [{ date: data.date, activity: categorizedActivities }],
        userId: data.userId,
      });

      user.activities = activities._id;
      await user.save();

      return NextResponse.json(
        { msg: "created new activities" },
        { status: 201 },
      );
    }

    const existingActivity = userActivities.activities.find(
      (item) => item.date === data.date,
    );

    if (existingActivity) {
      existingActivity.activity = categorizedActivities;
    } else {
      userActivities.activities.push({
        date: data.date,
        activity: categorizedActivities,
      });
    }

    await userActivities.save();
    return NextResponse.json({ msg: categorizedActivities }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "failed to save activities." },
      { status: 500 },
    );
  }
}
