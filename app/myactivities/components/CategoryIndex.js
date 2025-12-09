export default function CategoryIndex({ colourList, categoryList }) {
  let updatedCategoryList;
  if (categoryList) updatedCategoryList = [...categoryList, "No activity"];
  return (
    <div className="mt-12 mb-10">
      {" "}
      <div className="flex justify-around pl-6 sm:pl-0 ">
        <div className="flex flex-wrap gap-3">
          {updatedCategoryList?.map((cat, index) => {
            return (
              <div key={index} className="flex items-center">
                {" "}
                <div
                  style={{
                    backgroundColor:
                      index === updatedCategoryList?.length - 1
                        ? "#808080"
                        : colourList[index],
                  }}
                  className="w-4 mx-1 h-4"
                ></div>
                <div>{cat} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
