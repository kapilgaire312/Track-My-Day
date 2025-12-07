import StackedBarChart from "./stackBarChart";

export default function StackChartMulti({
  activities,
  categoryList,
  colourList,
}) {
  console.log(activities);
  const noOfDays = activities?.length;
  const today = new Date();

  const datesList = [];
  datesList.push(
    today.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  );

  for (let i = 1; i < noOfDays; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    datesList.push(
      day.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    );
  }
  console.log(datesList);
  return (
    <div>
      {activities?.map((activity, index) => {
        return (
          <div key={index}>
            <div className="font-semibold text-xl text-center">
              {datesList[index]}
            </div>
            <StackedBarChart
              activity={activity}
              categoryList={categoryList}
              colourList={colourList}
            />
          </div>
        );
      })}
    </div>
  );
}
