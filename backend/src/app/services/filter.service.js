const StyleModel = require("../models/style.model");
const VibeModel = require("../models/vibe.model");

const filterService = {
  styleFind: async (data) => {
    try {
      return StyleModel.find(data);
    } catch (error) {
      return error;
    }
  },

  vibeFind: async (data) => {
    try {
      return VibeModel.find(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = filterService;
