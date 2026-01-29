import getActivityDb from "./getActivityDb";
import { timeSegments } from "./timeStamps";

export const getActivity = async (
  session,
  selectedDate,
  setLoading,
  setActivity,
) => {
  setLoading(true);
  let storedActivity = await getActivityDb(
    session?.user?.email,
    selectedDate.toDateString(),
    1,
  );
  if (!storedActivity || storedActivity.length === 0) {
    storedActivity = timeSegments.map((item, index) => {
      return { isSelected: false, value: "", category: null };
    });
  }

  setActivity(storedActivity);
  setLoading(false);
};
