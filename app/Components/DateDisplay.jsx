'use client'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { goTomorrow, goYesterday } from "../utils/handleDate";


export default function DateDisplay({ selectedDate, setSelectedDate }) {

  function blurDateInput() {
    setTimeout(() => {
      document.activeElement?.blur();
    }, 20);
  }

  function isTodaySelected() {

    return (new Date().toDateString() === selectedDate.toDateString())
  }





  return (
    <div className="flex justify-end select-none">
      <div className="flex gap-1 sm:gap-2 justify-center  pr-2 sm:pr-8 my-4 text-[15px] sm:text-xl font-semibold h-full ">
        <button className="h-full bg-gray-200 rounded" onClick={() => { goYesterday(selectedDate, setSelectedDate) }}>&lt;&lt;</button>
        <div>

          <DatePicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => { setSelectedDate(date); blurDateInput() }}
            maxDate={new Date()}
            read-only
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.blur()}
            dateFormat="MMMM d"
            popperPlacement="bottom-start"
            className=" max-w-28 sm: max-w-32text-center bg-gray-200 rounded px-1"
          />

        </div>

        <button className={`bg-gray-200 disabled:bg-gray-50 rounded`} disabled={isTodaySelected()} onClick={() => { goTomorrow(selectedDate, setSelectedDate) }}>&gt;&gt;</button>

      </div>
    </div>
  )
}