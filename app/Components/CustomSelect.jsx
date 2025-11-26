'use client'
import { useState, useRef, useEffect } from 'react'

const options = [
  { label: 'Reading', value: 'reading' },
  { label: 'Running', value: 'running' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Painting', value: 'painting' },
]

export default function CustomSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const listRef = useRef(null)

  // close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const choose = (opt) => {
    setSelected(opt)
    setOpen(false)
  }

  return (
    <div className="relative w-64" ref={listRef}>
      {/* Control */}
      <div
        className="border border-gray-300 bg-white rounded-md px-4 py-2 flex justify-between items-center cursor-pointer shadow-sm
                   hover:border-gray-400 focus:outline-none"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setOpen(!open)
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        <span className="truncate text-gray-700">
          {selected ? selected.label : 'Select an activity'}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected?.value === opt.value ? 'bg-gray-100 font-medium' : ''
                }`}
              onClick={() => choose(opt)}
              onKeyDown={(e) => e.key === 'Enter' && choose(opt)}
              tabIndex={0}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
