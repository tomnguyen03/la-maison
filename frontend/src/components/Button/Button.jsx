import React from 'react'

export default function Button(props) {
  return (
    <button
      className={`w-full flex items-center justify-center bg-red-dd text-white text-sm rounded ${props.className}`}
      type={props.type}
    >
      {props.title}
    </button>
  )
}
