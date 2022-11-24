const lodash = require('lodash')

const cafeHelper = {
  convertRatingPredToNumber: cafesRecommend => {
    return cafesRecommend.map(cafe => {
      const rating = Number.parseFloat(cafe[cafe.length - 1])
      cafe[cafe.length - 1] = rating
      return cafe
    })
  },

  sortRatingDesc: cafes => {
    return cafes.sort((a, b) => b[4] - a[4])
  },

  getNumberCafesRecommend: cafes => {
    let cafeIds = []

    cafes = cafeHelper.convertRatingPredToNumber(cafes)

    cafes = cafeHelper.sortRatingDesc(cafes)

    for (const cafe of cafes) {
      cafeIds.push(cafe[0])
    }

    return cafeIds
  },

  getListPage: (cafes, limit, page) => {
    start = (page - 1) * limit
    end = page * limit

    return lodash.slice(cafes, start, end)
  }
}

module.exports = cafeHelper
