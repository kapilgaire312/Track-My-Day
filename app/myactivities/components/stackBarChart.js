import { useEffect, useState } from "react";
import { showDetailsOfSegment } from "./utils";

export default function StackedBarChart({
  activity,
  categoryList,
  colourList,
}) {
  const timeSegment = ["12 PM", "5 AM", "10 AM", "3 PM", "8 PM", "12 PM"];
  const timeSegIndexList = [0, 10, 20, 30, 40, 47];
  const [showSectionInfo, setShowSectionInfo] = useState([]);

  useEffect(() => {
    let timeoutId;
    if (showSectionInfo.length) {
      timeoutId = setTimeout(() => {
        setShowSectionInfo([]);
      }, 800);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showSectionInfo]);
  return (
    <div>
      <div className="flex select-none w-[100%] p-5 justify-center mb-20">
        {activity?.map((item, index) => {
          const catIndex = getIndexOfCat(categoryList, item.category);

          const colour = catIndex !== -1 ? colourList[catIndex] : "#808080";

          return (
            <div
              key={index}
              className={"w-2 h-8 border-1 border-gray-100 sm:w-5 "}
              style={{ backgroundColor: colour }}
              onClick={() => {
                const sectionInfo = showDetailsOfSegment(
                  index,
                  timeSegment,
                  timeSegIndexList,
                  activity,
                  categoryList,
                );
                setShowSectionInfo(sectionInfo);
              }}
            >
              {timeSegIndexList.includes(index) && (
                <div
                  className={`absolute ${index === 47 ? "sm:border-r-2" : "border-l-2"}`}
                >
                  {showSectionInfo[1] &&
                    index >= showSectionInfo[1][0]?.start &&
                    index < showSectionInfo[1][0]?.end && (
                      <div
                        className={`bg-white w-26 min-h-20 absolute bottom-14 border text-center z-10 ${isLastSection(showSectionInfo, timeSegment) && "right-2"} `}
                      >
                        <div className="text-sm font-semibold">
                          {showSectionInfo[1][1].startSecTime} -{" "}
                          {showSectionInfo[1][1].endSecTime}
                        </div>
                        <div className="text-sm">
                          {showSectionInfo[0]?.map((item, secInfoIndex) => {
                            return (
                              <div key={secInfoIndex}>
                                {item.category?.length > 6
                                  ? item.category.slice(0, 4) + "..."
                                  : item.category}{" "}
                                : {item.time} hrs
                              </div>
                            );
                          })}
                          {!showSectionInfo[0].length && (
                            <div>No activities for this section.</div>
                          )}
                        </div>
                      </div>
                    )}

                  <div
                    className={`relative top-7  ${index === 47 ? "right-1" : "left-1"} w-4 `}
                  >
                    {timeSegment[timeSegIndexList.indexOf(index)]}{" "}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isLastSection(showSectionInfo, timeSegment) {
  return (
    showSectionInfo[1][1]?.endSecTime === timeSegment[timeSegment.length - 1]
  );
}

function getIndexOfCat(categoryList, category) {
  return categoryList?.indexOf(category);
}
