"use server";

export async function getPreviousDaysActivities(activitiesDb, date, days) {
  const today = new Date(date);
  const previousDays = getPreviousDays(today, days);
  console.log("previousdays", previousDays);
  const existingActivity = await activitiesDb.activities.filter((item) =>
    previousDays.includes(item.date),
  );

  if (!existingActivity) {
    return null;
  }
  let requiredActivity = maintainOrderOfActivityDays(
    existingActivity,
    previousDays,
  );
  return requiredActivity;
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
