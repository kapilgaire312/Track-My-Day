import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Activity from "@/lib/models/activity-model";
import findCategory from "@/utils/findCategory";
import { normalizeCategoryList } from "@/utils/categoryList";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    console.log(userId);
    await dbConnect();

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

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    const { userId } = await params;
    if (!session?.user?.email || session.user.email !== userId) {
      return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
    }

    const { categoryList } = await req.json();
    const normalizedCategories = normalizeCategoryList(categoryList);
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ msg: "Not found." }, { status: 404 });
    }

    const activities = await Activity.findOne({ userId });
    if (activities) {
      for (const day of activities.activities) {
        day.activity = await findCategory(
          day.activity,
          normalizedCategories,
          true,
        );
      }
      await activities.save();
    }

    user.categoryList = normalizedCategories;
    await user.save();
    return NextResponse.json({ categoryList: normalizedCategories }, { status: 200 });
  } catch (error) {
    console.error("Failed to update categories:", error);
    return NextResponse.json(
      { msg: error.message || "Failed to update categories." },
      { status: 400 },
    );
  }
}
