const shareLocationService = require("../services/shareLocation.service");

const shareLocationController = {
  createShareLocation: async (req, res) => {
    try {
      const accountId = req.user._id;
      if (!req.body) {
        throw new Error("Invalid Input value");
      }
      const data = {
        accountId: accountId,
        name: req.body.name,
        style: req.body.style,
        detail_address: req.body.detail_address,
        instagram: req.body.instagram,
        website: req.body.website,
      };
      const response = await shareLocationService.createOne(data);

      return res.json({ message: "Successfully", data: response });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  getListShareLocation: async (req, res) => {
    try {
      const ListShareLocation = await shareLocationService.find();
      const response = {
        message: "Lấy danh sách list suggest thành công",
        data: ListShareLocation,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = shareLocationController;
