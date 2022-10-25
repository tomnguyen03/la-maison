const CollectionModel = require("../models/collection.model");

const collectionService = {
  createOne: async (data) => {
    try {
      const collection = new CollectionModel(data);
      return collection.save();
    } catch (error) {
      return error;
    }
  },
  find: async (data) => {
    try {
      return CollectionModel.find(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = collectionService;
