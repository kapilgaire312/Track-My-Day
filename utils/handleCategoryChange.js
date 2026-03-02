"use server";

import { getPreviousDaysActivities } from "@/app/api/activity/[userId]/[date]/getPreviousDaysActivities";
import dbConnect from "@/lib/services/mongodb";

export default async function handleCategoryChange(categoryList) {
  try {
    let date = new Date();
    dbConnect();
    const activitiesDb = await Activity.findOne({ userId });

    if (!activitiesDb) {
      throw new Error("user not found");
    }

    let sevenDaysActivities = getPreviousDaysActivities(
      activitiesDb,
      date.toDateString(),
      7,
    );
  } catch (error) {}
}
