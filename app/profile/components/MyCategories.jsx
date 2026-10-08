import { useState } from "react";
import { useSession } from "next-auth/react";
import Popup from "./Popup";

export default function MyCategories({ categoryList, setCategoryList }) {
  const { data: session } = useSession();
  const [popup, setPopup] = useState({
    isSelected: false,
    index: null,
    type: null,
    msg: null,
    butt1: null,
    butt2: null,
  });

  async function saveCategoryList(nextCategoryList) {
    const userId = session?.user?.email;
    if (!userId) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const response = await fetch(`/api/category/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ categoryList: nextCategoryList }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.msg || "Failed to save categories.");
    }
    setCategoryList(result.categoryList);
  }
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
          onCategoryListChange={saveCategoryList}
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
                  className="ui-button w-[80%] bg-gray-200 rounded"
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
                  className="ui-button w-[80%] bg-gray-300 rounded px-1"
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
          className="ui-button bg-gray-200 text-[1.2rem] px-2 rounded cursor-pointer hover:bg-gray-300"
          onClick={handleAdd}
        >
          Add Category
        </div>
      </div>
    </div>
  );
}
