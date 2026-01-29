"use client";
import { signOut } from "next-auth/react";
import Loading from "../../Components/Loading";
import { useCheckSession } from "../../hooks/useCheckSession";
import MyProfile from "./components/MyProfile";
import MyCategories from "./components/MyCategories";
import { useCategoryListContext } from "../../Contexts/categoryContext";

export default function Profile() {
  const status = useCheckSession();

  const { categoryList, setCategoryList, email } = useCategoryListContext();

  console.log(categoryList);
  console.log(email);

  async function handleSignout() {
    const res = await signOut();
  }

  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    return (
      <div className={"flex flex-col gap-8 pl-3 py-4"}>
        <MyProfile handleSignout={handleSignout} email={email} />
        <MyCategories
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      </div>
    );
  }
}
