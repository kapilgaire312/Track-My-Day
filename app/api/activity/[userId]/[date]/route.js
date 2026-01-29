import Activity from "@/lib/models/activity-model";
import dbConnect from "@/lib/services/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId, date } = await params;
    console.log(userId);
    console.log(date);
    const days = req.nextUrl.searchParams.get("days");
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
      console.log(JSON.stringify(existingActivity, null, 2));
      return NextResponse.json(
        { msg: existingActivity.activity },
        { status: 200 },
      );
    } else {
      const today = new Date(date);
      const previousDays = getPreviousDays(today, days);
      console.log(previousDays);
      const existingActivity = await activitiesDb.activities.filter((item) =>
        previousDays.includes(item.date),
      );

      if (!existingActivity) {
        return NextResponse.json({ msg: null }, { status: 404 });
      }
      console.log(JSON.stringify(existingActivity[0], null, 2));
      let requiredActivity = maintainOrderOfActivityDays(
        existingActivity,
        previousDays,
      );
      return NextResponse.json({ msg: requiredActivity }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Cannot fetch the activities.");
  }
}

function getPreviousDays(today, days) {
  const todayDate = today.getDate();
  let previousDays = [];

  for (let i = 0; i < days; i++) {
    const previousDate = new Date(today);
    previousDate.setDate(todayDate - i);
    previousDays.push(previousDate.toDateString());
  }
  return previousDays;
}

function maintainOrderOfActivityDays(activities, daysList) {
  const sortedActivities = daysList.map((day, index) => {
    let foundActivity = [];
    foundActivity = activities.find((item) => day === item.date);
    if (!foundActivity) {
      let newActivity = [];

      for (let i = 0; i < 48; i++) {
        newActivity.push({
          isSelected: false,
          value: "",
          category: null,
        });
      }
      return newActivity;
    }
    return foundActivity.activity;
  });
  return sortedActivities;
}
