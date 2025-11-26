'use client'
import Link from "next/link";
import SignUpForm from "./SIgnUpForm";
import dbConnect from "../../lib/services/mongodb";



export default function Signup() {
  dbConnect()
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="shadow-xl p-5">
          <div>
            <SignUpForm />

            <div>
              <p className="text-gray-500 text-sm text-center">
                Already registered? <span className="underline"><Link href={"/login"}>Login here!</Link> </span>
              </p>
            </div>


          </div>

        </div>

      </div>
    </>
  )
}