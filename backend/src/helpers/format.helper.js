const formatHelper = {
  formatArrayIds: arrIds => {
    return arrIds.map(item => item._id.valueOf())
  },

  formatCafe: cafes => {
    return cafes.map(cafe => [
      cafe._id.valueOf(),
      cafe.style_id,
      cafe.vibe_id,
      cafe.districtId
    ])
  },

  formatRatingHistory: ratings => {
    return ratings.map(item => [
      item.accountId.valueOf(),
      item.cafeId.valueOf(),
      item.rating
    ])
  }
}

module.exports = formatHelper
