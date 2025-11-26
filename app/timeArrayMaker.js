

function timeSegArray() {
  let timeSegments = [];
  for (let i = 5; i <= 12; i++) {
    timeSegments.push(`${i}:00 A.M - ${i}:30 A.M`, `${i}:30 A.M - ${i + 1}:00 A.M`)
  }
  console.log(timeSegments)
}

timeSegArray()