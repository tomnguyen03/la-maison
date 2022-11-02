import React from 'react'

export default function Button(props) {
  return (
    <button
      className={`${props.className} w-full flex items-center justify-center bg-red-dd text-white text-sm rounded`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  )
}
