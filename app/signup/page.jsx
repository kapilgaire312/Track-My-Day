"use client";
import Link from "next/link";
import SignUpForm from "./SIgnUpForm";
import dbConnect from "../../lib/services/mongodb";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

export default function Signup() {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    } else if (status === "unauthenticated") {
      setShowSignupForm(true);
    }
  }, [status]);
  dbConnect();
  return showSignupForm ? (
    <>
      <div className="flex justify-center mt-8">
        <div className="shadow-xl p-5">
          <div>
            <SignUpForm />

            <div>
              <p className="text-gray-500 text-sm text-center">
                Already registered?{" "}
                <span className="underline">
                  <Link href={"/login"}>Login here!</Link>{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

