'use client'
import { redirect } from "next/navigation"


export default async function handleSubmit(email, password, cpassword) {

  const formdata = {
    email,
    password,
    cpassword,
  }
  console.log(formdata)
  const res = await fetch('/api/user/signup', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata)
  })
  console.log(res.ok)
  if (!res.ok) {
    const error = await res.json()
    console.log('entered')
    console.log(error)
    return error.msg
  }
  else {
    redirect('/')

  }
}