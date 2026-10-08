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
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import Select from "react-select";
import { useActivityContext } from "../Contexts/activityContext.js";

import { useCategoryListContext } from "../Contexts/categoryContext";
import { categoryListConvert } from "../utils/createOptionsFromCat";
import { timeSegments } from "../utils/timeStamps";
import { updateDbActivity } from "../utils/updateDb";
import { getActivity } from "../utils/fetchFromDb";

export default function TimingDisplay({ selectedDate }) {
  const { activity, setActivity } = useActivityContext();
  const inputRef = useRef([]);

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const [categoryReturned, setCategoryReturned] = useState([]);
  const [updateDb, setUpdateDb] = useState();
  const [openSection, setOpenSection] = useState(null);

  const { categoryList } = useCategoryListContext();

  useEffect(() => {
    updateDbActivity(
      activity,
      selectedDate,
      session,
      categoryList,
      setActivity,
    );
  }, [updateDb]);

  useEffect(() => {
    getActivity(session, selectedDate, setLoading, setActivity);
  }, [selectedDate]);

  useEffect(() => {
    setOpenSection(Math.floor(new Date().getHours() / 4));
  }, []);

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
    const updatedActivity = activity?.map((item) => {
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
        <div className="grid grid-cols-[40px_50px_1fr] gap-x-4 sm:gap-x-6 sm:grid-cols-[100px_0.5fr_1fr] select-none items-center">
          <div className="font-bold text-xl text-center ">
            <button></button>
          </div>
          <div className="font-semibold text-xl sm:text-2xl text-center py-1 bg-gray-300 rounded">
            {" "}
            Time
          </div>
          <div className="font-semibold text-xl sm:text-2xl mr-1 text-center py-1 bg-gray-300 rounded">
            What i did
          </div>
        </div>
        {Array.from({ length: 6 }, (_, sectionIndex) => {
          const startIndex = sectionIndex * 8;
          const endIndex = startIndex + 8;
          const sectionActivities = activity?.slice(startIndex, endIndex);
          const sectionTitle = `${timeSegments[startIndex].split(" - ")[0]} - ${timeSegments[endIndex - 1].split(" - ")[1]}`;

          return (
            <section key={sectionIndex} className="mt-3">
              <button
                type="button"
                className="ui-button w-full rounded bg-gray-200 px-3 py-2 text-left text-lg font-semibold hover:bg-gray-300"
                onClick={() =>
                  setOpenSection((current) =>
                    current === sectionIndex ? null : sectionIndex,
                  )
                }
                aria-expanded={openSection === sectionIndex}
              >
                <span className="mr-2">{openSection === sectionIndex ? "−" : "+"}</span>
                {sectionTitle}
              </button>

              {openSection === sectionIndex && (
                <div className="time-section-content grid grid-cols-[40px_50px_1fr] gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5 sm:grid-cols-[100px_0.5fr_1fr] select-none items-center">
                  {sectionActivities?.map((item, sectionItemIndex) => {
                    const index = startIndex + sectionItemIndex;
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
                            className="h-6 w-6 rounded border border-gray-300"
                          />
                        </div>

                        <div>
                          <div className="my-5 text-center px-2 font-semibold text-[15px] sm:text-auto">
                            {timeSegments[index]}
                          </div>
                        </div>

                        <div className="mx-4 my-5">
                          {(item.category ||
                            (item.category === null && item.value !== "")) && (
                            <Select
                              className="my-dropdown w-42"
                              value={
                                item.category
                                  ? categoryListConvert([item.category])[0]
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
                              isLoading={item.category === null}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  backgroundColor: "#f0f0f0",
                                }),
                                menu: (provided) => ({
                                  ...provided,
                                  backgroundColor: "#ffffff",
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
                            className={`p-2 h-24 w-full text-wrap text-xl border-2 border-gray-300 text-center transition-colors duration-150 focus:border-gray-500 ${item?.value && "bg-gray-200"}`}
                            onBlur={() => {
                              setTimeout(() => {
                                setUpdateDb(Math.random());
                              }, 500);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
