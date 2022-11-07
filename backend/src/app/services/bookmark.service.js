const BookmarkModel = require("../models/bookmark.model");

const bookmarkService = {
  createOne: async (data) => {
    try {
      const bookmark = new BookmarkModel(data);
      return bookmark.save();
    } catch (error) {
      return error;
    }
  },
  find: async (data) => {
    try {
      return BookmarkModel.find(data);
    } catch (error) {
      return error;
    }
  },
  findOne: async (data) => {
    try {
      return BookmarkModel.findOne(data);
    } catch (error) {
      return error;
    }
  },
  deleteOne: async (data) => {
    try {
      return BookmarkModel.deleteOne(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = bookmarkService;
