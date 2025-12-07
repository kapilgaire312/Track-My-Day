"use server";
import getActivityDb from "@/app/utils/getActivityDb";
// fetch activity of today
export async function fetchFromDB(session) {
  let storedActivity;
  const date = new Date().toDateString();
  console.log(date);
  console.log(session?.user);
  try {
    if (session?.user) {
      storedActivity = await getActivityDb(session.user.email, date);
    }
  } catch (error) {
    console.log(error);
  }
  return storedActivity;
}

// fetch for multiple days activities

export async function fetchMultiFromDb(session, days) {
  let storedActivity;
  let allActivities = [];
  const date = new Date().toDateString();
  console.log(date);
  console.log(session?.user);
  try {
    if (session?.user) {
      storedActivity = await getActivityDb(session.user.email, date, days);
    }
  } catch (error) {
    console.log(error);
  }
  return storedActivity;
}
