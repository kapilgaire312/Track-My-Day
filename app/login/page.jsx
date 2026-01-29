"use client";
import Link from "next/link";
import LoginForm from "./loginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

export default function Login() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    } else if (status === "unauthenticated") {
      setShowLoginForm(true);
    }
  }, [status]);
  return showLoginForm ? (
    <div className="flex justify-center mt-8">
      <div className="shadow-xl p-5 ">
        <div>
          <LoginForm />
          <div>
            <p className="text-gray-500 text-sm text-center">
              New user?{" "}
              <span className="underline">
                <Link href={"/signup"}>Sign Up here!</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

