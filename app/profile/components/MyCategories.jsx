import { useState } from "react";
import Popup from "./Popup";

export default function MyCategories({ categoryList, setCategoryList }) {
  const [popup, setPopup] = useState({
    isSelected: false,
    index: null,
    type: null,
    msg: null,
    butt1: null,
    butt2: null,
  });
  function handleEdit(index) {
    if (!popup.isSelected) {
      setPopup({
        isSelected: true,
        index,
        type: "edit",
        msg: "Edit the category:",
        butt1: "Cancel",
        butt2: "Okay",
      });
    }
  }
  function handleDelete(index) {
    if (!popup.isSelected) {
      setPopup({
        isSelected: true,
        index,
        type: "delete",
        msg: "Do you really want to delete the category?",
        butt1: "No",
        butt2: "Yes",
      });
    }
  }
  function handleAdd() {
    if (!popup.isSelected) {
      setPopup({
        isSelected: true,
        index: null,
        type: "add",
        msg: "Add new category:",
        butt1: "Cancel",
        butt2: "Add",
      });
    }
  }

  return (
    <div className="relative">
      <div className="font-semibold text-xl">My Categories</div>
      {popup.isSelected && (
        <Popup
          categoryList={categoryList}
          popup={popup}
          setCategoryList={setCategoryList}
          setPopup={setPopup}
        />
      )}{" "}
      <div
        className={`grid grid-cols-[auto_70px_90px] gap-6 px-2 mt-2 text-[1.2rem] sm:px-9 select-none ${popup.isSelected && "blur-[2px] pointer-events-none cursor-not-allowed"}`}
      >
        {" "}
        {categoryList.map((item, index) => {
          return (
            <div key={index} className="contents">
              <div>{item}</div>
              <div className="text-center">
                {" "}
                <button
                  className="w-[80%] bg-gray-200 rounded"
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="text-center">
                {" "}
                <button
                  className="w-[80%] bg-gray-300 rounded px-1"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-6">
        <div
          className="bg-gray-200 text-[1.2rem] px-2 rounded "
          onClick={handleAdd}
        >
          Add Category
        </div>
      </div>
    </div>
  );
}
