"use client";
import { useSession } from "next-auth/react";
import { useContext, createContext, useState, useEffect } from "react";
import getCategoryList from "./util";

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
    if (userId) {
      (async () => {
        const values = await getCategoryList(userId);
        if (values) {
          setEmail(values.email);
          setCategoryList(values.categoryList);
        }
      })();
    }
  }, [userId]);

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
