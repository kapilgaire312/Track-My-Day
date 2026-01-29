import { useState } from "react";

export default function Popup({
  categoryList,
  popup,
  setCategoryList,
  setPopup,
}) {
  const [value, setValue] = useState(
    categoryList[popup.index] ? categoryList[popup.index] : "",
  );
  const [error, setError] = useState(null);

  const MAX_CATEGORY = 8;
  const MIN_CATEGORY = 1;
  const MAX_CATEGORY_LENGTH = 15;

  const button1 = popup.butt1;
  const button2 = popup.butt2;
  const message = popup.msg;

  const functionHandlers = {
    Cancel: handleCancel,
    Okay: handleOkay,
    Yes: handleYes,
    No: handleNo,
    Add: handleAdd,
  };

  function handleOkay() {
    const inputEror = checkCategoryInputs();
    if (inputEror) return;
    const updatedCategoryList = categoryList.map((item, index) => {
      if (index === popup.index) {
        return value;
      }
      return item;
    });
    setCategoryList(updatedCategoryList);
    handleNo();
  }
  function handleCancel() {
    setValue(null);

    handleNo();
  }

  function handleYes() {
    if (categoryList.length === MIN_CATEGORY) {
      setError("There should be atleast one category!");
      return;
    }

    const updatedCategoryList = categoryList.filter((item, index) => {
      if (index === popup.index) {
        return false;
      }
      return true;
    });
    setCategoryList(updatedCategoryList);

    handleNo();
  }

  function handleAdd() {
    const inputEror = checkCategoryInputs();
    if (inputEror) return;
    if (categoryList.length === MAX_CATEGORY) {
      setError(`max ${MAX_CATEGORY} categories allowed!`);
      return;
    }
    setCategoryList([...categoryList, value]);
    handleNo();
  }

  function handleNo() {
    setPopup({
      isSelected: false,
      index: null,
      type: null,
      msg: null,
      butt1: null,
      butt2: null,
    });
  }

  function checkCategoryInputs() {
    if (!value.trim()) {
      setError("category cannot be empty!");
      return true;
    }
    if (value.trim().length > MAX_CATEGORY_LENGTH) {
      setError(`less than ${MAX_CATEGORY_LENGTH} characters allowed!`);
      return true;
    }
    return false;
  }

  return (
    <div className="absolute p-4 w-[80vw] sm:w-[60vw] rounded h-auto bg-gray-200 select-none top-[4vh] left-[8vw] sm:left-[18vw] z-10 text-center select-none">
      {" "}
      <div className="text-xl">{message}</div>
      {popup.type === "delete" ? (
        <input
          className="border-2 rounded px-2 py-1 mt-2 w-[80%] sm:w-[40%] "
          value={value}
          disabled
        ></input>
      ) : (
        <input
          className="border-2 rounded px-2 py-1 mt-2 w-[80%] sm:w-[40%]"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              popup.type === "add" ? handleAdd() : handleOkay();
            }
          }}
          autoFocus
        />
      )}
      <div className="text-red-400 pt-2">{error && error}</div>
      <div className="flex justify-end gap-10 mt-3">
        {" "}
        <button
          className="border-1 px-1 rounded bg-gray-300"
          onClick={functionHandlers[button1]}
        >
          {button1}
        </button>
        <button
          className="border-1 px-1 rounded bg-gray-100"
          onClick={functionHandlers[button2]}
        >
          {button2}
        </button>
      </div>
    </div>
  );
}
