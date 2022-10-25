const CollectionModal = require("../models/collection.model");

const collectionService = {
  createOne: async (data) => {
    try {
      const collection = new CollectionModal(data);
      return collection.save();
    } catch (error) {
      return error;
    }
  },
  find: async (data) => {
    try {
      return CollectionModal.find(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = collectionService;
