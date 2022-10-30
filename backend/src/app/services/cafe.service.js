const CafeModel = require("../models/cafe.model");

const cafeService = {
  createOne: async (data) => {
    try {
      const cafe = new CafeModel(data);
      return cafe.save();
    } catch (error) {
      return error;
    }
  },
  find: async (data) => {
    try {
      return CafeModel.find(data).select({ __v: 0 }).lean();
    } catch (error) {
      return error;
    }
  },

  findById: async (data) => {
    try {
      return CafeModel.findById(data).populate("wardId");
    } catch (error) {
      return error;
    }
  },
};

module.exports = cafeService;
