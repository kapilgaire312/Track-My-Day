"use server";

import { headers } from "next/headers";

export default async function saveActivityDb(
  activities,
  date,
  userId,
  categoryList,
) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");
  const res = await fetch(`${process.env.APP_URL}/api/activity`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify({ activities, date, userId, categoryList }),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed saving added activities.");
  }
  const category = await res.json();
  return category.msg;
}
