function getMinMaxCount(data) {
  let max = 0;
  let min = 24;
  data?.map((item, index) => {
    if (item?.time > max) {
      max = item?.time;
    }
    if (item?.time < min) {
      min = item?.time;
    }
  });
  //adjust for new day, no activities added
  if (max === 0) max = 4;
  if (min === 24) min = 0;
  return { min, max };
}

export function getTicks(data) {
  const MaxSegments = 6;
  const { min, max } = getMinMaxCount(data);
  let ticks = [];
  let segmentLength;

  if ((max - min) / 0.5 > MaxSegments - 1) {
    const segmentLengthPre = (max - min) / (MaxSegments - 1);

    const segCeil = Math.ceil(segmentLengthPre);
    segmentLength =
      segCeil - segmentLengthPre < 0.5
        ? segCeil
        : Math.floor(segmentLengthPre) + 0.5;
  } else {
    segmentLength = 0.5;
  }
  if (min != 0) ticks.push(0, min);
  else ticks.push(min);
  for (let i = 1; i < MaxSegments; i++) {
    ticks.push(min + i * segmentLength);
  }
  return ticks;
}
