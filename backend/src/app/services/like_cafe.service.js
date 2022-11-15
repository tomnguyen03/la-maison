const likeCafeModel = require('../models/like_cafe.model')

const likeCafeService = {
  createOne: async data => {
    try {
      const likeCafe = new likeCafeModel(data)
      return likeCafe.save()
    } catch (error) {
      return error
    }
  },

  findOne: async data => {
    try {
      return likeCafeModel.findOne(data)
    } catch (error) {
      return error
    }
  },

  deleteOne: async data => {
    try {
      return likeCafeModel.deleteOne(data)
    } catch (error) {
      return error
    }
  },

  count: async data => {
    try {
      return likeCafeModel.count(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = likeCafeService
