const filterService = require("../services/filter.service");

const FilterController = {
  getStyle: async (req, res) => {
    try {
      const listStyle = await filterService.styleFind();
      const response = {
        message: "Lấy danh sách style thành công",
        data: listStyle,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  getVibe: async (req, res) => {
    try {
      const listVibe = await filterService.vibeFind();
      const response = {
        message: "Lấy danh sách vibe thành công",
        data: listVibe,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = FilterController;
