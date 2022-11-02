import React from 'react'

export default function CommentItem(props) {
  const { image, name, content } = props

  return (
    <div className="flex items-center gap-2 px-[20px] py-[10px] w-full">
      <img
        src={
          image ||
          'https://nld.mediacdn.vn/291774122806476800/2022/3/19/20200403104047-41cb-16476717856591379514951.jpg'
        }
        alt="Background auth"
        className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover object-cover"
      />
      <div className="text-sm flex flex-col gap-1 bg-[#edeeef] py-2 px-3 rounded-xl flex-1">
        <h6 className="font-montserrat font-semibold">{name}</h6>
        <p className="">{content}</p>
        <div className="flex gap-8 text-grey-7 text-sm">
          <p>3 Thích</p>
          <p>4 Không thích</p>
        </div>
      </div>
    </div>
  )
}
