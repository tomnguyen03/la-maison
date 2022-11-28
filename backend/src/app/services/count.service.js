const countModel = require('../models/count_view.model')

const countService = {
  createOne: async data => {
    try {
      const count = new countModel(data)
      return count.save()
    } catch (error) {
      return error
    }
  },

  update: async (id, data) => {
    try {
      return countModel.updateOne({ _id: id }, data)
    } catch (error) {
      return error
    }
  },

  find: async () => {
    try {
      return countModel.find()
    } catch (error) {
      return error
    }
  },

  findOne: async data => {
    try {
      return countModel.findOne(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = countService
