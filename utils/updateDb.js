import saveActivityDb from "./saveActivityDb";

export function updateDbActivity(
  activity,
  selectedDate,
  session,
  categoryList,
  setActivity,
) {
  setTimeout(() => {
    let flag = true;
    let count = 0;
    activity?.map((item) => {
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

            const updateActivity = activity?.map((item, index) => {
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
}
