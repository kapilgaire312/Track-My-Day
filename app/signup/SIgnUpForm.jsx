"use client";
import { useState } from "react";
import handleSubmit from "./handleSubmit";

export default function SignUpForm() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div>
      <form
        onSubmit={async (e) => {

          e.preventDefault();
          if (isSubmitting) return;
          setIsSubmitting(true);
          setError(null);
          setSuccess(null);
          try {
            const result = await handleSubmit(
              e.target.email.value,
              e.target.password.value,
              e.target.cpassword.value,
            );
            if (result.error) {
              setError(result.error);
            } else {
              setSuccess(
                "Account created. Please check your email and verify your account before logging in.",
              );
              e.target.reset();
            }
          } catch (submitError) {
            setError("Unable to create your account. Please try again.");
          } finally {
            setIsSubmitting(false);
          }
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="ui-button border bg-gray-600 text-white font-bold px-5 py-1.5 rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </div>

      </form>
      {error && <p className="text-red-500 text-xs max-w-48 text-center mt-2 mb-2">{error}</p>}
      {success && <p className="text-green-700 text-xs max-w-64 text-center mt-2 mb-2">{success}</p>}
    </div>
  )
}