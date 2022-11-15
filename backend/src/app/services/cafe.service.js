const CafeModel = require('../models/cafe.model')

const cafeService = {
  createOne: async data => {
    try {
      const cafe = new CafeModel(data)
      return cafe.save()
    } catch (error) {
      return error
    }
  },
  find: async data => {
    try {
      if (data) {
        let { limit, page, ...query } = data
        limit = Number.parseInt(limit)
        let skip = (Number.parseInt(page) - 1) * limit
        return CafeModel.find(query).limit(limit).skip(skip).lean()
      } else {
        return CafeModel.find().limit(5)
      }
    } catch (error) {
      return error
    }
  },

  findById: async data => {
    try {
      return CafeModel.findById(data)
    } catch (error) {
      return error
    }
  },

  count: async data => {
    try {
      return CafeModel.count(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = cafeService
