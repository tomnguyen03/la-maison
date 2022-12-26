import React from 'react'
import Timestamp from 'react-timestamp'

function CommentItem({
  id,
  image,
  name,
  content,
  likeCount,
  dislikeCount,
  isLike,
  isDislike,
  createdAt,
  handleClickLike,
  handleClickRemoveLike,
  handleClickDislike,
  handleClickRemoveDislike
}) {
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
        <div className="flex flex-col lg:flex-row justify-between gap-1">
          <div className="flex gap-8 text-grey-7 text-sm">
            {isLike ? (
              <p
                className="cursor-pointer text-red-dd font-medium"
                onClick={() => handleClickRemoveLike(id)}
              >
                {likeCount} Thích
              </p>
            ) : (
              <p
                className="cursor-pointer "
                onClick={() => handleClickLike(id)}
              >
                {likeCount} Thích
              </p>
            )}
            {isDislike ? (
              <p
                className="cursor-pointer text-red-dd font-medium"
                onClick={() => handleClickRemoveDislike(id)}
              >
                {dislikeCount} Không Thích
              </p>
            ) : (
              <p
                className="cursor-pointer "
                onClick={() => handleClickDislike(id)}
              >
                {dislikeCount} Không Thích
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="italic">
              {<Timestamp relative date={createdAt} autoUpdate />}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
