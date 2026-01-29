export function categoryListConvert(categoryList) {
  return categoryList.map((item) => {
    return { value: item, label: item };
  });
}
