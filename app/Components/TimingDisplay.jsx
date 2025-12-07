"use client";

import { useEffect, useState, useRef } from "react";
import {
  updateCheckbox,
  updateValue,
  selectTimeSegment,
  saveActivity,
  outsideClick,
  selectionFocus,
} from "../utils/handleInput";
import saveActivityDb from "../utils/saveActivityDb";
import { useSession } from "next-auth/react";
import getActivityDb from "../utils/getActivityDb";
import Loading from "./Loading";
import Select from "react-select";
import { useActivityContext } from "../Contexts/activityContext.js";

import { useCategoryListContext } from "../Contexts/categoryContext";
import { categoryListConvert } from "../utils/createOptionsFromCat";

export default function TimingDisplay({ selectedDate }) {
  const timeSegments = [
    "12:00 P.M - 12:30 A.M",
    "12:30 A.M - 1:00 A.M",
    "1:00 A.M - 1:30 A.M",
    "1:30 A.M - 2:00 A.M",
    "2:00 A.M - 2:30 A.M",
    "2:30 A.M - 3:00 A.M",
    "3:00 A.M - 3:30 A.M",
    "3:30 A.M - 4:00 A.M",
    "4:00 A.M - 4:30 A.M",
    "4:30 A.M - 5:00 A.M",
    "5:00 A.M - 5:30 A.M",
    "5:30 A.M - 6:00 A.M",
    "6:00 A.M - 6:30 A.M",
    "6:30 A.M - 7:00 A.M",
    "7:00 A.M - 7:30 A.M",
    "7:30 A.M - 8:00 A.M",
    "8:00 A.M - 8:30 A.M",
    "8:30 A.M - 9:00 A.M",
    "9:00 A.M - 9:30 A.M",
    "9:30 A.M - 10:00 A.M",
    "10:00 A.M - 10:30 A.M",
    "10:30 A.M - 11:00 A.M",
    "11:00 A.M - 11:30 A.M",
    "11:30 A.M - 12:00 A.M",
    "12:00 A.M - 12:30 P.M",
    "12:30 P.M - 1:00 P.M",
    "1:00 P.M - 1:30 P.M",
    "1:30 P.M - 2:00 P.M",
    "2:00 P.M - 2:30 P.M",
    "2:30 P.M - 3:00 P.M",
    "3:00 P.M - 3:30 P.M",
    "3:30 P.M - 4:00 P.M",
    "4:00 P.M - 4:30 P.M",
    "4:30 P.M - 5:00 P.M",
    "5:00 P.M - 5:30 P.M",
    "5:30 P.M - 6:00 P.M",
    "6:00 P.M - 6:30 P.M",
    "6:30 P.M - 7:00 P.M",
    "7:00 P.M - 7:30 P.M",
    "7:30 P.M - 8:00 P.M",
    "8:00 P.M - 8:30 P.M",
    "8:30 P.M - 9:00 P.M",
    "9:00 P.M - 9:30 P.M",
    "9:30 P.M - 10:00 P.M",
    "10:00 P.M - 10:30 P.M",
    "10:30 P.M - 11:00 P.M",
    "11:00 P.M - 11:30 P.M",
    "11:30 P.M - 12:00 P.M",
  ];
  //const [activity, setActivity] = useState([]);
  const { activity, setActivity } = useActivityContext();
  const inputRef = useRef([]);

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const [categoryReturned, setCategoryReturned] = useState([]);
  const [updateDb, setUpdateDb] = useState();

  const { categoryList } = useCategoryListContext();

  useEffect(() => {
    let flag = false;
    const updateActivity = activity.map((item, index) => {
      if (item.category != categoryReturned[index]?.category) flag = true;

      return { ...item, category: categoryReturned[index]?.category };
    });
    if (flag) setActivity(updateActivity);
  }, [categoryReturned]);

  useEffect(() => {
    setTimeout(() => {
      let flag = true;
      let count = 0;
      activity.map((item) => {
        if (item.isSelected) count++;
      });
      console.log(count);
      if (count < 2) {
        console.log("running");
        try {
          if (!(activity?.length === 0)) {
            (async () => {
              const categories = await saveActivityDb(
                activity,
                selectedDate.toDateString(),
                session.user.email,
                categoryList,
              );
              console.log(categories);

              const updateActivity = activity.map((item, index) => {
                let flag = false;
                if (item.category != categories[index]?.category) flag = true;

                return { ...item, category: categories[index]?.category };
              });
              if (flag) setActivity(updateActivity);
            })();
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    }, 100);
  }, [updateDb]);

  useEffect(() => {
    const getActivity = async () => {
      setLoading(true);
      let storedActivity = await getActivityDb(
        session?.user?.email,
        selectedDate.toDateString(),
        1,
      );
      if (!storedActivity) {
        storedActivity = timeSegments.map((item, index) => {
          return { isSelected: false, value: "", category: null };
        });
      }

      setActivity(storedActivity);
      setLoading(false);
    };
    getActivity();
  }, [selectedDate]);

  useEffect(() => {
    const handleClick = () => {
      const isFocused = inputRef.current.find(
        (item) => item === document.activeElement,
      );
      if (!isFocused) {
        outsideClick(activity, setActivity);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [activity]);

  function onSelect(category, activity, setActivity) {
    const updatedActivity = activity.map((item) => {
      if (item.isSelected) {
        return { ...item, category: category.value, isSelected: false };
      }
      return item;
    });
    setActivity(updatedActivity);
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="mt-1 sm:mt-4">
        <div className=" grid grid-cols-[40px_50px_1fr] gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5 sm:grid-cols-[100px_0.5fr_1fr] select-none items-center">
          <div className="font-bold text-xl text-center ">
            <button></button>
          </div>
          <div className="font-semibold text-xl sm:text-2xl text-center py-1 bg-gray-300 rounded">
            Time
          </div>
          <div className="font-semibold text-xl sm:text-2xl mr-1 text-center py-1 bg-gray-300 rounded">
            What i did
          </div>

          {activity.map((item, index) => {
            return (
              <div
                className="contents"
                key={index}
                onClick={() => {
                  if (!document.activeElement.closest(".my-dropdown"))
                    selectTimeSegment(index, activity, setActivity, inputRef);
                  else selectionFocus(activity, setActivity, index);
                }}
              >
                <div className="p-5 my-5 text-center">
                  <input
                    type="checkbox"
                    checked={item?.isSelected}
                    onChange={() => {
                      updateCheckbox(index, activity, setActivity, inputRef);
                    }}
                    className=" h-6 w-6 rounded border border-gray-300 "
                  ></input>
                </div>

                <div>
                  <div className="my-5 text-center  px-2 font-semibold text-[15px]  sm:text-auto ">
                    {timeSegments[index]}
                  </div>
                </div>

                <div className="mx-4 my-5">
                  {(activity[index].category ||
                    (activity[index].category === null &&
                      activity[index].value !== "")) && (
                    <Select
                      className="my-dropdown w-42  "
                      value={
                        activity[index].category
                          ? categoryListConvert([activity[index].category])[0]
                          : null
                      }
                      onChange={(data) => {
                        setTimeout(() => {
                          onSelect(data, activity, setActivity);
                        }, 10);
                      }}
                      placeholder="category"
                      options={categoryListConvert(categoryList)}
                      isSearchable={false}
                      onFocus={() => {
                        selectionFocus(activity, setActivity, index);
                      }}
                      isLoading={
                        activity[index].category === null ? true : false
                      }
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#f0f0f0", // light gray background
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#ffffff", // menu background
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#cfe3ff"
                            : state.isFocused
                              ? "#e5f2ff"
                              : "#ffffff",
                          color: "#111827",
                        }),
                      }}
                    />
                  )}

                  <textarea
                    ref={(el) => {
                      inputRef.current[index] = el;
                    }}
                    type="text"
                    value={item?.value}
                    onChange={(e) => {
                      updateValue(
                        e.target.value.trimStart(),
                        activity,
                        setActivity,
                        index,
                      );
                    }}
                    onKeyDown={(e) => {
                      saveActivity(e.key, activity, setActivity, inputRef);
                    }}
                    className={`p-2 h-24 w-full text-wrap text-xl border-2 border-gray-300 text-center ${item?.value && "bg-gray-200"}`}
                    onBlur={() => {
                      setTimeout(() => {
                        console.log("focus gone");
                        setUpdateDb(Math.random());
                      }, 500);
                    }}
                  ></textarea>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
