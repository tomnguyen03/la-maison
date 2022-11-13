import React from 'react'
import CafeItem from './CafeItem'

export default function ListCafe({ listCafe }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {listCafe.map((item, index) => (
        <CafeItem
          id={item._id}
          name={item.name}
          address={item.detail_address}
          image={item.images[0]}
          key={index}
        />
      ))}
    </div>
  )
}
