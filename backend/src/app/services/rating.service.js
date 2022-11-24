const ratingModel = require('../models/rating.model')

const ratingService = {
  createOne: async data => {
    try {
      const rating = new ratingModel(data)
      return rating.save()
    } catch (error) {
      return error
    }
  },

  findOne: async data => {
    try {
      return ratingModel.findOne(data)
    } catch (error) {
      return error
    }
  },

  find: async data => {
    try {
      return ratingModel.find(data)
    } catch (error) {
      return error
    }
  },

  deleteOne: async data => {
    try {
      return ratingModel.deleteOne(data)
    } catch (error) {
      return error
    }
  },

  update: async (accountId, cafeId, data) => {
    try {
      return ratingModel.updateOne(
        { accountId: accountId, cafeId: cafeId },
        data
      )
    } catch (error) {
      return error
    }
  }
}

module.exports = ratingService
