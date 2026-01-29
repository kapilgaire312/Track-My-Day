"use server";

export default async function getCategoryList(userId) {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/category/${userId}`);
    const message = await res.json();
    console.log(message);
    const values = JSON.parse(message.msg);
    return values;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
