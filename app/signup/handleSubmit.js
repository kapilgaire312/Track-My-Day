"use client";


export default async function handleSubmit(email, password, cpassword) {

  const formdata = {
    email,
    password,
    cpassword,
  }
  const res = await fetch('/api/user/signup', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata)
  })
  const result = await res.json();
  if (!res.ok) {
    return { error: result.msg || "Unable to create your account." };
  }
  return { success: true, message: result.msg };
}