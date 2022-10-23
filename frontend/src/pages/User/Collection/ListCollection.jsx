import React from 'react'
import CollectionItem from './CollectionItem'

export default function ListCollection() {
  const listData = [
    {
      name: 'The running bean',
      style: 'Hiện đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/278233385_1989024831269691_7851063550956130046_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=wyoQCA1Q3zEAX8gHw28&_nc_ht=scontent.fdad3-6.fna&oh=00_AT8R78It7-ZuGwJYEaBW78guH_5jTjQu66k6atdwZ6ttbg&oe=63534FE3'
    },
    {
      name: "S'mores saigon caffe",
      style: 'Cổ điển',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/293967470_594739375659233_879182014846381418_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=uGNrLJHMXRkAX-bjzEG&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-CXiIgkv9D7j0DvAhppEXiExJxv9FIB-gKdhjDoM8pQg&oe=6351BAAE'
    },
    {
      name: 'Gia room',
      style: 'Tối giản',
      image:
        'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/246807695_198854522373251_9132298034127574184_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a26aad&_nc_ohc=wPR83LFYBfIAX9WMhD3&_nc_ht=scontent.fdad3-5.fna&oh=00_AT_8ZRI3rIMNuJyIrkmn8wZBekVKfLCGE-S7NPxWu4TVZA&oe=6351A0C9'
    },
    {
      name: 'Cafe Luia',
      style: 'Hiện đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/300920732_1125263764725879_7797150053629263679_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=p6VzcK_vatcAX_2logo&_nc_ht=scontent.fdad3-6.fna&oh=00_AT82aOAGZZWArYibGCBO8eYvDAp-xWRC0f1xov-tywE3yg&oe=63517383'
    },
    {
      name: 'Bel coffee',
      style: 'Đương đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/309356333_114758938076808_1092774281163190855_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=KITYAdxJWmoAX9fn5jW&_nc_ht=scontent.fdad3-6.fna&oh=00_AT8pqRYlh7fcSe7ZP8F9Z8c4O8atiu5g3f8Yqexk4-gWQw&oe=63527C89'
    },
    {
      name: 'wego coffee',
      style: 'Hiện đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.6435-9/131022900_1096994327404783_9088170800528015594_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=a_W5x2mQyrMAX8QAr08&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-_wBI4kH5p4nXOCPNjgNrua78kSm__z88vLPb_5G6UHw&oe=6372D46B'
    },
    {
      name: 'kinjo cafe',
      style: 'Mộc mạc',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/272300136_143090354784173_3946878264234629300_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=nck3JGB_X-oAX81LYtX&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-rrX5M4FqvDGGaZRDPkv2PSzZ3p5ja4D81EeB3nftrIg&oe=63525E9A'
    },
    {
      name: 'Cafe slow',
      style: 'Đương đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.6435-9/180661512_345632716910278_2935480026255030475_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0U2xyq5snCoAX_niquQ&tn=I_RUtshZaNgmJ-hu&_nc_ht=scontent.fdad3-6.fna&oh=00_AT8WTP_B-TvsDPuXab6c2COSfC9ows3lGSzChlKwoWYzwA&oe=6373BA0C'
    },
    {
      name: 'Cafe Luia',
      style: 'Hiện đại',
      image:
        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/300920732_1125263764725879_7797150053629263679_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=p6VzcK_vatcAX_2logo&_nc_ht=scontent.fdad3-6.fna&oh=00_AT82aOAGZZWArYibGCBO8eYvDAp-xWRC0f1xov-tywE3yg&oe=63517383'
    }
  ]
  return (
    <div className="grid grid-cols-3 gap-8">
      {listData.map((item, index) => (
        <CollectionItem
          name={item.name}
          image={item.image}
          key={index}
        />
      ))}
    </div>
  )
}
