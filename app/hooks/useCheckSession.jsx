import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export function useCheckSession() {
  const { data: session, status } = useSession();  // here the useSession returns a data object and status. the data contains the user deatils and expiry time which we then redefined to session.
  //we simply redefined the data as session
  //the status has 3 values: loading( fectching session data), authenticated and unauthenticated.
  const route = useRouter();




  useEffect(() => {
    if (status === "unauthenticated") {
      route.replace('/login')
    }
  }, [status])
  return status;

}
