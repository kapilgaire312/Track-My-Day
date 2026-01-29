"use server";

export default async function saveActivityDb(
  activities,
  date,
  userId,
  categoryList,
) {
  console.log("yoyo");
  const res = await fetch(`${process.env.APP_URL}/api/activity`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ activities, date, userId, categoryList }),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed saving added activities.");
  }
  const category = await res.json();
  return category.msg;
}
