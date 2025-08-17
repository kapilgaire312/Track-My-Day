"use client"

import { useEffect, useState, useRef } from "react"
import { updateCheckbox, updateValue, selectTimeSegment, saveActivity } from "../utils/handleInput"
export default function TimingDisplay() {
  const timeSegments = ["5:00 - 5:30", "5:30 - 6:00", "6:00 - 6:30 ", "6:30 - 7:00", "7:00 - 7:30 ", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00", "9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30"]
  const [activity, setActivity] = useState([])
  const inputRef = useRef([])

  useEffect(() => {
    const initialActivity = timeSegments.map((item, index) => {
      return { isSelected: false, value: "" }

    });
    setActivity(initialActivity)
  }, [])

  useEffect(() => { console.log(activity) }, [activity])






  return (
    <>
      {/* <div>
        <div className="grid grid-cols-3">
          <div><button>ff.</button></div>
          <div>time</div>
          <div>What i did</div>
        </div>

      </div> */}

      <table className="table-fixed text-center border-separate border-spacing-y-4 border-2">
        <thead className="border-2">
          <tr >
            <th className="border-2" >Selection</th>
            <th>time</th>
            <th>What i did</th>
          </tr>

        </thead>

        <tbody>
          {activity.map((item, index) => {
            console.log('entered')
            return <tr key={index} onClick={() => { selectTimeSegment(index, activity, setActivity, inputRef) }} >
              <th className="p-4 m-4"><input type="checkbox" checked={item.isSelected} onChange={() => { updateCheckbox(index, activity, setActivity, inputRef) }}></input></th>
              <th className="p-4">{timeSegments[index]}</th>
              <th className="p-4">
                <input
                  ref={(el) => { inputRef.current[index] = el }}
                  type="text" value={item.value}
                  onChange={(e) => {
                    updateValue(e.target.value, activity, setActivity)
                  }}
                  onKeyDown={(e) => { saveActivity(e.key, activity, setActivity, inputRef) }}
                  className="p-2"
                ></input>
              </th>

            </tr>
          })}

        </tbody>


      </table >
    </>
  )
}