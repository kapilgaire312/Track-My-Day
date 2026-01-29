'use client'

import TimingDisplay from "../Components/TimingDisplay";

import DateDisplay from "../Components/DateDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckSession } from "../hooks/useCheckSession";
import Loading from "../Components/Loading";

export default function Home() {
  // const { data: session, status } = useSession();  // here the useSession returns a data object and status. the data contains the user deatils and expiry time which we then redefined to session.
  // //we simply redefined the data as session
  // //the status has 3 values: loading( fectching session data), authenticated and unauthenticated.
  // const route = useRouter();

  const [selectedDates, setSelectedDates] = useState(new Date())


  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     route.replace('/login')
  //   }
  // }, [status])

  const status = useCheckSession();


  if (status === 'loading') return <Loading />
  else if (status === 'authenticated')
    return (

      <div >
        <DateDisplay selectedDate={selectedDates} setSelectedDate={setSelectedDates} />

        <TimingDisplay selectedDate={selectedDates} />
      </div>
    );
}

