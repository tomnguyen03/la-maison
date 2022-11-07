const bookmarkService = require("../services/bookmark.service");

const bookmarkController = {
  createBookmark: async (req, res) => {
    try {
      const accountId = req.user._id;
      if (!req.body) {
        throw new Error("Invalid Input value");
      }
      const data = {
        accountId: accountId,
        collectionId: req.body.collectionId,
        cafeId: req.body.cafeId,
      };
      const bookmark = await bookmarkService.createOne(data);

      return res.json({ message: "Successfully", data: bookmark });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  getBookmarkByAccountId: async (req, res) => {
    try {
      const listBookmark = await bookmarkService.find({ accountId: req.user._id });
      const response = {
        message: "Lấy danh sách list bookmark thành công",
        data: listBookmark,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      const data = {
        accountId: req.user._id,
        cafeId: req.body.cafeId,
      };

      await bookmarkService.deleteOne(data);

      const response = {
        message: "Sucessfully",
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = bookmarkController;
