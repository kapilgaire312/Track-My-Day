import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    console.log(userId);
    dbConnect();

    //querry to find the user.
    const user = await User.findById(userId);

    if (user) {
      const email = user.email;
      const categoryList = user.categoryList;
      console.log(email);
      return NextResponse.json(
        { msg: JSON.stringify({ email, categoryList }) },
        { status: 200 },
      );
    }
    return NextResponse.json({ msg: "Not found" }, { status: 404 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
