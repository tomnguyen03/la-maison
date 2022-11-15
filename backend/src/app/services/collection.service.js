const CollectionModel = require('../models/collection.model')

const collectionService = {
  createOne: async data => {
    try {
      const collection = new CollectionModel(data)
      return collection.save()
    } catch (error) {
      return error
    }
  },
  find: async data => {
    try {
      return CollectionModel.find(data)
    } catch (error) {
      return error
    }
  },
  findOne: async data => {
    try {
      return CollectionModel.findOne(data)
    } catch (error) {
      return error
    }
  },
  update: async (id, data) => {
    try {
      return CollectionModel.findByIdAndUpdate(id, data)
    } catch (error) {
      return error
    }
  }
}

module.exports = collectionService
