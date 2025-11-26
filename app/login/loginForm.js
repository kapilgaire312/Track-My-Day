'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null)
  const router = useRouter()

  async function handleSubmit(email, password) {

    const res = await signIn('credentials',
      {
        redirect: false,
        email,
        password
      }
    )

    console.log(res)
    // const message = await res.json()

    if (res.error) {
      setErrorMsg('Invalid Credentials.')
    }
    else {
      router.replace('/')
      setErrorMsg(null)
    }



  }
  return (
    <div>

      <form onSubmit={
        (e) => {
          e.preventDefault();
          handleSubmit(e.target.email.value, e.target.password.value)
        }
      }>


        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">

            <label htmlFor='email'>Email:</label>
            <input name="email" className="border-2 border-gray-400 rounded" id="email"></input>

          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="pass">Password:</label>
            <input name="password" className="border-2 border-gray-400 rounded" id="pass" type="password"></input>

          </div>


        </div>

        <div className={`text-center mt-6 ${!errorMsg && 'mb-5'}`}>
          <button className="border bg-gray-600 text-white font-bold px-5 py-1.5 rounded">Login</button>
        </div>

      </form>
      {errorMsg && <p className="text-red-500 text-xs max-w-48 text-center mt-2 mb-2">{errorMsg}</p>}
    </div>
  )
}