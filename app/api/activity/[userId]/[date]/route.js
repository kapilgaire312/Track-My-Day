import Activity from "@/lib/models/activity-model";
import dbConnect from "@/lib/services/mongodb";
import { NextResponse } from "next/server";
import { getPreviousDaysActivities } from "./getPreviousDaysActivities.js";

export async function GET(req, { params }) {
  try {
    const { userId, date } = await params;
    console.log(userId);
    console.log(date);
    const daysString = req.nextUrl.searchParams.get("days");
    const days = Number(daysString);
    console.log(days);

    await dbConnect();

    const activitiesDb = await Activity.findOne({ userId });

    if (!activitiesDb) {
      return NextResponse.json({ msg: null }, { status: 404 });
    }

    if (days === 1) {
      const existingActivity = activitiesDb.activities.find(
        (item) => item.date === date,
      );

      if (!existingActivity) {
        return NextResponse.json({ msg: null }, { status: 404 });
      }
      return NextResponse.json(
        { msg: existingActivity.activity },
        { status: 200 },
      );
    } else {
      let requiredActivity = await getPreviousDaysActivities(
        activitiesDb,
        date,
        days,
      );
      if (!requiredActivity) {
        return NextResponse.json({ msg: null }, { status: 500 });
      }

      return NextResponse.json({ msg: requiredActivity }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Cannot fetch the activities.");
  }
}
