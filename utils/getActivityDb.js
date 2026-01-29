"use server";

export default async function getActivityDb(userId, date, days = 1) {
  try {
    console.log("db request came");
    const res = await fetch(
      `${process.env.APP_URL}/api/activity/${userId}/${date}?days=${days}`,
    );

    const activity = await res.json();
    console.log(activity?.msg);
    if (days === 1) {
      const activities = activity?.msg[0]?.map((item) => {
        return {
          isSelected: false,
          value: item.value,
          category: item.category,
        };
      });
      console.log(activities);
      return activities;
    } else {
      return activity?.msg;
    }
  } catch (error) {
    console.log(error.message);
  }
}
