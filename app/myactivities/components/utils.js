 export function showDetailsOfSegment(
  index,
  timeSegment,
  timeSegIndexList,
  activity,
  categoryList,
) {
  let timeSections = [];
  let timeSectionIndex;

  let segmentActivity = [];

  for (let i = 0; i < timeSegment.length - 1; i++) {
    timeSections.push({
      start: timeSegIndexList[i],
      end:
        timeSegment.length - 2 === i
          ? timeSegIndexList[i + 1]
          : timeSegIndexList[i + 1] - 1,
    });
  }

  timeSections.map((item, secIndex) => {
    if (index >= item.start && index <= item.end) {
      timeSectionIndex = secIndex;
    }
  });

  categoryList.map((item) => {
    segmentActivity.push({ category: item, time: 0 });
  });

  activity.map((item, activityIndex) => {
    if (
      activityIndex >= timeSections[timeSectionIndex].start &&
      activityIndex <= timeSections[timeSectionIndex].end
    ) {
      segmentActivity.forEach((segItem) => {
        if (segItem.category === item.category) {
          segItem.time += 0.5;
        }
      });
    }
  });
  segmentActivity = segmentActivity.filter((item) => item.time > 0);
  const finalsegmentActivity = [
    [...segmentActivity],
    [
      timeSections[timeSectionIndex],
      {
        startSecTime: timeSegment[timeSectionIndex],
        endSecTime: timeSegment[timeSectionIndex + 1],
      },
    ],
  ];
  console.log(finalsegmentActivity);
  return finalsegmentActivity;
}
