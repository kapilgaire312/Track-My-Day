"use client";

import Select from "react-select";
import { useActivityContext } from "../Contexts/activityContext";
import { fetchFromDB, fetchMultiFromDb } from "./utils/fetchFromDB.js";
import { useCategoryListContext } from "../Contexts/categoryContext";
import CategoryBarChart from "./components/CategoryBarChart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { categoryListConvert } from "../utils/createOptionsFromCat";
import { handleOnChangeCategory } from "./utils/handleSelectOnChange";
import { countCategory } from "./utils/countCategory";
import { filterMultiActivity, spreadMultiActivity } from "./utils/handleMulti";
import StackedBarChart from "./components/stackBarChart";
import CategoryIndex from "./components/CategoryIndex";
import StackChartMulti from "./components/StackChartMulti";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f7f",
  "#8dd1e1",
  "#a4de6c",
];
export default function MyActivities() {
  const { activity, setActivity } = useActivityContext();
  const { categoryList } = useCategoryListContext();
  const { data: session, status } = useSession();
  const [selectedCategory, setSelectedCategory] = useState([
    { value: "All", label: "All" },
  ]);

  const dateOptions = [
    { value: "Today", label: "Today" },
    { value: "3-Days", label: "3 Days" },
    { value: "7-Days", label: "7 Days" },
  ];

  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);

  const [allActivities, setAllActivities] = useState(activity);

  const [activityOf7Days, setActivityOf7Days] = useState([]);
  const [activityOf3Days, setActivityOf3Days] = useState([]);

  let categoryCount;

  let selectedCat;
  if (allActivities) {
    if (selectedCategory[0].value === "All") selectedCat = [...categoryList];
    else selectedCat = selectedCategory.map((item) => item.value);
    categoryCount = countCategory(allActivities, selectedCat);
    console.log(categoryCount);
  }

  //fetch todays data
  useEffect(() => {
    if (!session?.user) return;
    (async () => {
      const todayActivities = await fetchFromDB(session);
      setAllActivities(todayActivities);
      setActivity(todayActivities); // to prevent the mutation of todays data when we return to home ('/')
    })();
  }, [session]);

  // fetch data for 7 days when user visits the page
  useEffect(() => {
    if (!activityOf7Days?.length) {
      (async () => {
        const fetchedActivities = await fetchMultiFromDb(session, 7);
        setActivityOf7Days(fetchedActivities);
      })();
    }
  }, [session]);

  // after fetching data of seven days, add the values for 3 days
  useEffect(() => {
    setActivityOf3Days(filterMultiActivity(activityOf7Days, 3));
  }, [activityOf7Days]);

  //handle change of date selection
  useEffect(() => {
    if (selectedDate.value === "3-Days") {
      setAllActivities(spreadMultiActivity(activityOf3Days));
    } else if (selectedDate.value === "7-Days") {
      setAllActivities(spreadMultiActivity(activityOf7Days));
    } else if (selectedDate.value === "Today") {
      setAllActivities(activity);
    }
  }, [selectedDate]);

  return (
    <div className="overflow-hidden">
      <div>
        <div className=" flex  p-2 justify-center ">
          <div className="pl-6 text-2xl font-bold sm:text-3xl">
            {" "}
            My Activities
          </div>
        </div>
        <div className="flex justify-between gap-4 text-sm sm:pl-18 sm:text-xl mt-3 sm:pr-32 sm:mb-2 ">
          {" "}
          <div>
            <h2 className="opacity-60 pl-2 mb-1">Select category:</h2>

            <div className="h-20 pl-6   flex ">
              <Select
                instanceId="my-select"
                value={selectedCategory}
                placeholder="category"
                options={[
                  { value: "All", label: "All" },
                  ...categoryListConvert(categoryList),
                ]}
                isMulti
                isSearchable={false}
                onChange={(data) => {
                  console.log(data);
                  handleOnChangeCategory(data, setSelectedCategory);
                }}
                isClearable={false}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col pr-2">
              <h2 className="opacity-60 mb-1 ">Select days:</h2>
              <Select
                instanceId="my-select-2"
                value={selectedDate}
                placeholder="Days"
                options={dateOptions}
                isSearchable={false}
                onChange={(data) => {
                  setSelectedDate(data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <CategoryBarChart data={categoryCount} colourList={COLORS} />
      <CategoryIndex colourList={COLORS} categoryList={selectedCat} />
      {selectedDate.value === "Today" ? (
        <StackedBarChart
          activity={allActivities}
          categoryList={selectedCat}
          colourList={COLORS}
        />
      ) : (
        <StackChartMulti
          activities={
            selectedDate.value === "3-Days" ? activityOf3Days : activityOf7Days
          }
          categoryList={selectedCat}
          colourList={COLORS}
        />
      )}
    </div>
  );
}
