import Activity from "@/lib/models/activity-model";
import dbConnect from "@/lib/services/mongodb"
import { NextResponse } from "next/server";


export async function GET(req, { params }) {

  try {

    const { userId, date } = await params
    await dbConnect();

    const activitiesDb = await Activity.findOne({ userId })

    if (!activitiesDb) {
      return NextResponse.json({ msg: null }, { status: 404 })
    }

    const existingActivity = activitiesDb.activities.find(item => item.date === date)

    if (!existingActivity) {
      return NextResponse.json({ msg: null }, { status: 404 })

    }

    return NextResponse.json({ msg: existingActivity.activity }, { status: 200 })



  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch the activities.')
  }



}