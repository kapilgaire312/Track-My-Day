"use client";
import { useContext, createContext, useState } from "react";

// create the context
const ActivityContext = createContext();

//craete provider component

export function ActivityProvider({ children }) {
  //Define the sate to share
  const [activity, setActivity] = useState([]);

  //value object to share
  const value = { activity, setActivity };
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

//create a custom hook to use the context.
// while we can directly use the value in the pages, this allows to debug errors
export function useActivityContext() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivityContext must be used within the ActivityProvider ",
    );
  }
  return context;
}

// now we need to wrap the children in layout with ActivityProvider.
