export function updateCheckbox(selectedIndex, activity, setActivity, inputRef) {
  const updatedActivity = activity.map((item, index) => {
    if (index === selectedIndex) {
      if (item.isSelected) {
        inputRef.current[selectedIndex].blur()
        const nextSelected = activity.findIndex((item, thisIndex) => { if (index != thisIndex) { return item.isSelected } })
        inputRef.current[nextSelected]?.focus()
        console.log(nextSelected)
      }
      return { isSelected: !item.isSelected, value: item.value }
    }
    return item
  })
  setActivity(updatedActivity)


}

export function updateValue(value, activity, setActivity) {
  const updatedActivity = activity.map((item) => {
    if (item.isSelected) {
      return { isSelected: item.isSelected, value }
    }
    return item
  })
  setActivity(updatedActivity)
}

export function selectTimeSegment(selectedIndex, activity, setActivity, inputRef) {
  const updatedActivity = activity.map((item, index) => {

    return { isSelected: (index === selectedIndex) ? true : false, value: item.value }
  })
  setActivity(updatedActivity)
  inputRef.current[selectedIndex].focus()
}


export function saveActivity(key, activity, setActivity, inputRef) {

  if (key === 'Enter') {
    const updatedActivity = activity.map((item) => { return { isSelected: false, value: item.value } })
    setActivity(updatedActivity)

    inputRef.current.map((item) => {
      if (item === document.activeElement) {
        item.blur()
      }
    })
  }

}