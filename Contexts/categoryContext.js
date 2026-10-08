"use client";
import { useSession } from "next-auth/react";
import { useContext, createContext, useState, useEffect } from "react";

//create the context for category

const categoryListContext = createContext(null);

//create a provider
export function CategoryListProvider({ children }) {
  //define the lists

  const [categoryList, setCategoryList] = useState([]);

  const { data, status } = useSession();
  const userId = data?.user?.email;

  const [email, setEmail] = useState(null);
  //fetch lists from the db
  useEffect(() => {
    if (!userId || status !== "authenticated") return;

    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`/api/category/${userId}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Unable to load categories.");

        const message = await response.json();
        const values =
          typeof message.msg === "string"
            ? JSON.parse(message.msg)
            : message.msg;
        if (!cancelled && values) {
          setEmail(values.email);
          setCategoryList(values.categoryList);
        }
      } catch (error) {
        if (!cancelled) console.error("Failed to load categories:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, userId]);

  //define object for values to send
  const values = { categoryList, setCategoryList, email }; //here we are also sending the email to show it to profile section

  return (
    <categoryListContext.Provider value={values}>
      {children}
    </categoryListContext.Provider>
  );
}

//custom hook to use the context
export function useCategoryListContext() {
  const context = useContext(categoryListContext);
  if (!context) {
    throw new Error("Cannot use the context outside the provider.");
  }
  return context;
}
