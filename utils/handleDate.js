export function goYesterday(selectedDate, setSelectedDate) {
  const preDate = new Date(selectedDate)
  preDate.setDate(selectedDate.getDate() - 1)
  setTimeout(() => {
    setSelectedDate(preDate)
  }, 0);

}

export function goTomorrow(selectedDate, setSelectedDate) {
  const nextDate = new Date(selectedDate)
  nextDate.setDate(selectedDate.getDate() + 1)

  const today = new Date()
  if (nextDate <= today) {
    setTimeout(() => {
      setSelectedDate(nextDate)
    }, 0);
  }
}