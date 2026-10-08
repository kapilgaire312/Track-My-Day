"use server";
import { classifyActivities } from "@/lib/classifier/activityClassifier";
import { normalizeCategoryList } from "./categoryList";

export default async function findCategory(
  activities,
  categoryList,
  recalculate = false,
) {
  const normalizedCategories = normalizeCategoryList(categoryList);
  const classify = async (item, index) => {
    const value = item?.value?.trim();
    if (value) {
      const categoryIsValid = normalizedCategories.includes(item.category);
      if (!item.category || (recalculate && !categoryIsValid)) {
        const result = await classifyActivities(value, normalizedCategories);
        const predictedCategory = result?.labels?.[0];
        if (!normalizedCategories.includes(predictedCategory)) {
          throw new Error("Classifier returned an invalid category.");
        }
        return { ...item, value: item.value, category: predictedCategory };
      }
    }
    return { ...item, value: item.value, category: item.category };
  };
  let categorizedActivities;
  if (activities)
    categorizedActivities = await Promise.all(activities?.map(classify)); //Promise.all() in JavaScript takes an iterable (such as an array) of promises and returns a single new promise.
  return categorizedActivities;
}
