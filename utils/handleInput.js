export function updateCheckbox(selectedIndex, activity, setActivity, inputRef) {
  const updatedActivity = activity?.map((item, index) => {
    if (index === selectedIndex) {
      if (item.isSelected) {
        inputRef.current[selectedIndex].blur();
        const nextSelected = activity?.findIndex((item, thisIndex) => {
          if (index != thisIndex) {
            return item.isSelected;
          }
        });
        inputRef.current[nextSelected]?.focus();
      }
      return {
        isSelected: !item.isSelected,
        value: item.value,
        category: item.category,
      };
    }
    return item;
  });
  setActivity(updatedActivity);
}

export function updateValue(value, activity, setActivity, index) {
  const updatedActivity = activity?.map((item, itemIndex) => {
    if (itemIndex === index) {
      return {
        isSelected: true,
        value,
        category: value === "" ? item.category : null,
      };
    }
    if (item.isSelected) {
      return {
        isSelected: item.isSelected,
        value,
        category: value === "" ? item.category : null,
      };
    }
    return item;
  });
  setActivity(updatedActivity);
}

export function selectTimeSegment(
  selectedIndex,
  activity,
  setActivity,
  inputRef,
) {
  let updatedActivity = activity?.map((item, index) => {
    return {
      isSelected: index === selectedIndex ? true : false,
      value: item.value,
      category: item.category,
    };
  });
  setActivity(updatedActivity);
  if (inputRef) inputRef.current[selectedIndex].focus();
}

export function saveActivity(key, activity, setActivity, inputRef) {
  if (key === "Enter") {
    const updatedActivity = activity.map((item) => {
      return {
        isSelected: false,
        value: item.value,
        category: item.value === "" ? null : item.category,
      };
    });
    setActivity(updatedActivity);

    inputRef.current.map((item) => {
      if (item === document.activeElement) {
        item.blur();
      }
    });
  }
}

export function outsideClick(activity, setActivity) {
  const updatedActivity = activity?.map((item) => {
    return {
      isSelected: false,
      value: item.value,
      category: item.value === "" ? null : item.category,
    };
  });
  setActivity(updatedActivity);
}

export function selectionFocus(activity, setActivity, clickedIndex) {
  const selectedActivities = activity?.map((item, index) => {
    if (item.isSelected) return index;
  });
  let flag = true;
  selectedActivities.map((item) => {
    if (item === clickedIndex) {
      flag = false;
    }
  });

  if (flag) {
    const updatedActivity = activity.map((item, index) => {
      if (index === clickedIndex) {
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };
    });
    setActivity(updatedActivity);
    return;
  }

  const updatedActivity = activity?.map((item, index) => {
    const isSelected = selectedActivities.filter((item) => {
      if (item === index) return true;
    });
    console.log(isSelected.length);
    if (isSelected.length) {
      return { ...item, isSelected: true };
    }

    return item;
  });
  setActivity(updatedActivity);
}
