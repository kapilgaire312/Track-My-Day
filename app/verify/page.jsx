'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Verify() {

  const [message, setMessage] = useState("Please wait while we verify the user...")
  const searchParams = useSearchParams()
  const route = useRouter()


  useEffect(() => {
    const token = searchParams?.get('token')
    if (token) {
      verifyCall(token)
    }
    else {
      route.replace("/login")
    }

  }, [searchParams])


  async function verifyCall(token) {
    const res = await fetch("/api/verify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token })
      }
    )
    const response = await res.json()
    console.log(response)
    if (res.status === 200) {
      setMessage(response.msg + "\nRedirecting...")
      setTimeout(() => {
        route.replace("/login")
      }, 1500);
    }
    if (!res.OK) {
      setMessage(response.msg)

    }
  }

  return (
    <div className="flex justify-center items-center mt-6">
      <div className=" shadow-sm w-48 text-center pb-12">
        <div className="bg-gray-300 p-1 my-2 text-2xl">
          User Verification
        </div>
        <div className="mt-2 ">
          {message}
        </div>
      </div>
    </div>
  )
}