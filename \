export function filterMultiActivity(totalActivity, days) {
  if (totalActivity?.length) {
    let newActivity = [];
    for (let i = 0; i < days; i++) {
      newActivity.push(totalActivity[i]);
    }
    return newActivity;
  }
}
export function spreadMultiActivity(Multiactivity) {
  let addedActivity = [];
  Multiactivity?.map((item) => {
    addedActivity = [...addedActivity, ...item];
  });
  return addedActivity;
}
