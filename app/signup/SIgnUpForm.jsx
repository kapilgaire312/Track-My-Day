'use client'
import { useEffect, useState } from "react";
import handleSubmit from "./handleSubmit";

export default function SignUpForm() {
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <div>
      <form
        onSubmit={async (e) => {

          e.preventDefault();
          const errorMessage = await handleSubmit(e.target.email.value, e.target.password.value, e.target.cpassword.value)
          console.log(errorMessage)
          setError(errorMessage)
        }}

      >


        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">

            <label htmlFor='email'>Email:</label>
            <input className="border-2 border-gray-400 rounded" id="email" name="email"></input>

          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="pass">Password:</label>
            <input className="border-2 border-gray-400 rounded" id="pass" type="password" name="password"></input>

          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cpassword">Confirm Password:</label>
            <input name="cpassword" className="border-2 border-gray-400 rounded" id="cpassword" type="password"></input>

          </div>


        </div>

        <div className={`text-center mt-6 ${!error && 'mb-5'}`}>
          <button className="border bg-gray-600 text-white font-bold px-5 py-1.5 rounded">Sign Up</button>
        </div>

      </form>
      {error && <p className="text-red-500 text-xs max-w-48 text-center mt-2 mb-2">{error}</p>}
    </div>
  )
}