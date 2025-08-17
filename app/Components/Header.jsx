import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <div className="flex justify-between items-center bg-gray-300">

      <div>

        <div className="m-2">
          <Link href={'/'}>
            <div className="flex gap-1">
              <div>
                <Image className="rounded-full h-auto w-auto " priority src={"/logo.png"}
                  alt="logo"
                  width={80}
                  height={50}
                ></Image>

              </div>
              <div className="font-bold pt-3 w-24 pb-0 m-0">

                Track My
                <hr className="w-20 border-t-2 border-gray-500"></hr>
                <div className="text-end">
                  Day
                  <div className="flex justify-end">
                    <hr className="w-9 border-t-2 border-gray-500" />

                  </div>

                </div>

              </div>



            </div>
          </Link>

        </div>

      </div>

      <div className="mr-2.5">

        <div className="flex gap-6 items-end ">
          <div>
            <Link href={'/myactivities'}> My Activities</Link>
          </div>
          <Link href={'/profile'}>
            <div className="border-2">
              👤
            </div>
          </Link>
        </div>
      </div>


    </div>

  )
}