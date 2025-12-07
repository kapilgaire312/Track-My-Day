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

  const categorizedActivities = await Promise.all(activities.map(classify));
  console.log(`in finding category`);
  console.log(categorizedActivities);
  return categorizedActivities;
}
