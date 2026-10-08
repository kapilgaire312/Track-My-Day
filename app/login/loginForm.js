'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";


export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter()

  function useTestAccount() {
    emailRef.current.value = "test@gmail.com";
    passwordRef.current.value = "12345678";
    setErrorMsg(null);
  }

  async function handleSubmit(email, password) {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const verificationCheck = await fetch("/api/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const verificationResult = await verificationCheck.json();

      if (!verificationCheck.ok) {
        setErrorMsg(verificationResult.msg || "Unable to log in.");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setErrorMsg("Unable to log in. Please try again.");
        return;
      }
      router.replace("/");
    } catch (error) {
      setErrorMsg("Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <input ref={emailRef} name="email" className="border-2 border-gray-400 rounded" id="email"></input>

          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="pass">Password:</label>
            <input ref={passwordRef} name="password" className="border-2 border-gray-400 rounded" id="pass" type="password"></input>

          </div>


        </div>

        <div className={`text-center mt-6 ${!errorMsg && 'mb-5'}`}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ui-button border bg-gray-600 text-white font-bold px-5 py-1.5 rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>

      </form>
      <button
        type="button"
        disabled={isSubmitting}
        onClick={useTestAccount}
        className="ui-button w-full rounded border border-gray-400 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Use test account
      </button>
      <p className="mt-2 text-center text-xs text-gray-500">
        Fills the demo account credentials for you.
      </p>
      {errorMsg && <p className="text-red-500 text-xs max-w-48 text-center mt-2 mb-2">{errorMsg}</p>}
    </div>
  )
}