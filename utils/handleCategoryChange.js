"use server";

import { getPreviousDaysActivities } from "@/app/api/activity/[userId]/[date]/getPreviousDaysActivities";
import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import findCategory from "./findCategory";
import Activity from "@/lib/models/activity-model";
import { auth } from "@/auth";

export default async function handleCategoryChange(newCategoryList) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("not allowed");
    }
    console.log(session);
    const userId = session.user?.email;
    let date = new Date();
    dbConnect();
    const activitiesDb = await Activity.findOne({ userId });
    const user = await User.findById(userId);

    if (!activitiesDb || !user) {
      throw new Error("user not found");
    }
    console.log(user.categoryList);

    let [sevenDaysActivities, daysList] = await getPreviousDaysActivities(
      activitiesDb,
      date.toDateString(),
      7,
    );
    const updatedActivities = await Promise.all(
      sevenDaysActivities?.map((item) => {
        return findCategory(item, newCategoryList, true);
      }),
    );
    console.log("updatedaa", updatedActivities);

    const allActivities = activitiesDb.activities;
    const daysMap = new Map();
    daysList.forEach((day, index) => daysMap.set(day, index));

    console.log("daysmap", daysMap);
    const totalActivities = allActivities.length;
    let count = 0;
    for (let i = totalActivities - 1; i >= 0; i--) {
      count++;
      if (daysMap.has(allActivities[i].date)) {
        console.log("index:", allActivities[i].date);
        console.log(allActivities[i].activities);
        console.log(updatedActivities[daysMap.get(allActivities[i].date)]);
        allActivities[i].activity =
          updatedActivities[daysMap.get(allActivities[i].date)];
        daysMap.delete(allActivities[i].date);
      }
      if (!daysMap.size || count > 50) {
        break;
      }
    }

    user.categoryList = newCategoryList;
    await activitiesDb.save();
    await user.save();
  } catch (error) {
    console.log(error);
  }
}
