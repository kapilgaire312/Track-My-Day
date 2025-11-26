import Link from "next/link";
import LoginForm from "./loginForm";


export default function Login() {



  return (
    <div className="flex justify-center mt-8">
      <div className="shadow-xl p-5 ">
        <div>

          <LoginForm />
          <div>
            <p className="text-gray-500 text-sm text-center">
              New user? <span className="underline"><Link href={"/signup"}>Sign Up here!</Link> </span>
            </p>
          </div>


        </div>

      </div>

    </div>
  )
}