"use server";
import { classifyActivities } from "@/lib/classifier/activityClassifier";

export default async function findCategory(activities, categoryList) {
  const classify = async (item, index) => {
    if (item?.value?.trim() != "") {
      if (!item.category) {
        const category = await classifyActivities(item.value, categoryList);
        console.log(category);
        return { value: item.value, category: category?.labels[0] };
      } else return { value: item.value, category: item.category };
    }
    return { value: item.value, category: item.category };
  };
  let categorizedActivities;
  if (activities)
    categorizedActivities = await Promise.all(activities?.map(classify)); //Promise.all() in JavaScript takes an iterable (such as an array) of promises and returns a single new promise.
  console.log(categorizedActivities);
  return categorizedActivities;
}
