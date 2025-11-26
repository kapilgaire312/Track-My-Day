'use client'
import { signOut } from "next-auth/react";
import Loading from "../Components/Loading";
import { useCheckSession } from "../hooks/useCheckSession";



export default function Profile() {
  const status = useCheckSession();


  async function handleSignout() {
    const res = await signOut()
  }

  if (status === 'loading') {
    return <Loading />
  }

  else if (status === 'authenticated') {
    return (
      <div className="flex justify-center items-center mt-14">
        <div>
          user profile
          <div className="mt-3">
            <button className="bg-gray-300 rounded p-1" onClick={handleSignout}>
              Sign Out
            </button>
          </div>

        </div>

      </div>
    )
  }
}