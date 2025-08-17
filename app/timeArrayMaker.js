

function timeSegArray() {
  let timeSegments = [];
  for (let i = 5; i <= 12; i++) {
    timeSegments.push(`${i}:00 - ${i}:30`, `${i}:30 - ${i + 1}:00`)
  }
  console.log(timeSegments)
}

timeSegArray()