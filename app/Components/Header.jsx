'use client'
import Link from "next/link";
import Image from "next/image";
import { useCheckSession } from "../hooks/useCheckSession";
export default function Header() {

  const status = useCheckSession()

  function isAuthenticated() {
    if (status === 'authenticated')
      return true
    return false
  }


  return (
    <div className="flex justify-between items-center bg-gray-300">

      <div>

        <div className="m-1 sm:m-2">
          <Link href={'/'}>
            <div className="flex gap-1">
              <div>
                <Image className="rounded-full h-auto w-auto " priority src={"/logo.png"}
                  alt="logo"
                  width={40}
                  height={40}
                ></Image>

              </div>
              <div className="font-bold pt-3 w-20 sm:w-32 pb-0 m-0 text-xs sm:text-xl">

                Track My
                <hr className="w-14 sm:w-22 border-t-2 border-gray-500"></hr>
                <div className="text-end">
                  Day
                  <div className="flex justify-end">
                    <hr className="w-6 sm:w-10 border-t-2 border-gray-500" />

                  </div>

                </div>

              </div>



            </div>
          </Link>

        </div>

      </div>

      <div className="mr-2.5">

        {isAuthenticated() && <div className="flex text-xs sm:text-xl gap-2 sm:gap-8 md:gap-10 items-end ">
          <div className="bg-gray-100 px-1 py-0.5 rounded">
            <Link href={'/myactivities'}> My Activities</Link>
          </div>
          <Link href={'/profile'}>
            <div className=" px-1 py-0.5 rounded bg-gray-100">
              👤
            </div>
          </Link>
        </div>}
      </div>


    </div>

  )
}