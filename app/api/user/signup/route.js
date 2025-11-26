import { NextResponse } from "next/server";
import { validateSignupInfo } from "../utils";
import { createUser } from "./controller";


export async function POST(req) {

  const user = await req.json()

  if (user) {
    try {
      validateSignupInfo(user);
      await createUser(user);



      return NextResponse.json({ msg: `User created sucess` }, { status: 201 })

    } catch (error) {
      if (error.name.includes('Mongo'))
        return NextResponse.json({ msg: 'Internal server error. Try again later.' }, { status: 500 })

      return NextResponse.json({ msg: error.message }, { status: 400 })

    }
  }

}


