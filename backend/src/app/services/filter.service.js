const StyleModal = require("../models/style.model");
const VibeModal = require("../models/vibe.model");

const filterService = {
  styleFind: async (data) => {
    try {
      return StyleModal.find(data);
    } catch (error) {
      return error;
    }
  },

  vibeFind: async (data) => {
    try {
      return VibeModal.find(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = filterService;
