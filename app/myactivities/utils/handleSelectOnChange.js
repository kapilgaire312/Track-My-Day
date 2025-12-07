export function handleOnChangeCategory(data, setSelectedCategory) {
  function checkForAll() {
    const index = data.findIndex((item) => item.value === "All");
    if (!isNaN(index)) {
      if (index < data.length - 1) return -1;
      else return 1;
    }
    return 0;
  }
  const item = checkForAll();
  console.log(item);
  if (item === 0) {
    setSelectedCategory(data);
  } else if (item === -1) {
    const updatedData = data.filter((item) => item.value !== "All");
    setSelectedCategory(updatedData);
  } else if (item === 1) {
    setSelectedCategory([{ value: "All", label: "All" }]);
  }
}
