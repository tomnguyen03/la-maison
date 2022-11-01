import React from 'react'

export default function CommentItem(props) {
  const { image, name, comment, like, dislike } = props

  return (
    <div className="flex items-center justify-start gap-2 px-[20px] py-[10px] w-full">
      <img
        src={image}
        alt="Background auth"
        className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover object-cover"
      />
      <div className="text-sm flex flex-col gap-1">
        <h6>{name}</h6>
        <p className="">{comment}</p>
        <div className="flex gap-8 text-grey-7">
          <p>{like} Thích</p>
          <p>{dislike} Không thích</p>
        </div>
      </div>
    </div>
  )
}
