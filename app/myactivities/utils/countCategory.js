export function countCategory(activity, category) {
  const categoryCount = [];
  category.map((item) => {
    categoryCount.push({ name: item, time: 0 });
  });

  if (activity.length) {
    activity.map((item) => {
      if (item.category) {
        categoryCount.forEach((cat) => {
          if (item.category === cat.name) {
            cat.time += 0.5;
          }
        });
      }
    });
  }
  return categoryCount;
}
