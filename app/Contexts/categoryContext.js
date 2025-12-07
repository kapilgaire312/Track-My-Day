"use client";
import { useContext, createContext, useState } from "react";

//create the context for category

const categoryListContext = createContext(null);

//create a provider
export function CategoryListProvider({ children }) {
  //define the lists

  const [categoryList, setCategoryList] = useState([
    "food",
    "health",
    "career",
    "sleep",
    "miscellaneous",
  ]);
  //define object for values to send
  const values = { categoryList, setCategoryList };

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
