import React, { useEffect, useState } from 'react'
import { forwardRef } from 'react'
import Dropdown from 'src/components/Dropdown/Dropdown'
import listenForOutsideClick from 'src/hooks/listenForOutsideClick'

const ListFilterItem = (props, refItem) => {
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    listenForOutsideClick(refItem, setShowDropdown)
  }, [refItem])

  return (
    <div className="relative w-28 flex justify-center">
      <div
        onClick={() => setShowDropdown(true)}
        className={`rounded-full w-14 h-14 cursor-pointer flex items-center justify-center bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] text-xs 
        ${showDropdown && 'bg-red-e5 text-white shadow-none'}`}
        ref={refItem}
      >
        {props.title}
      </div>
      <div
        className={`${!showDropdown && 'hidden'} absolute top-[65px]`}
      >
        {props.dropdown && <Dropdown listDropdown={props.dropdown} />}
      </div>
    </div>
  )
}

export default forwardRef(ListFilterItem)
