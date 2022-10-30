const AccountModel = require("../models/account.model");

const accountService = {
  createOne: async (data) => {
    try {
      const account = new AccountModel(data);
      return account.save();
    } catch (error) {
      return error;
    }
  },
  findOne: async (data) => {
    try {
      return AccountModel.findOne(data);
    } catch (error) {
      return error;
    }
  },
  update: async (id, data) => {
    try {
      return AccountModel.findOneAndUpdate(id, data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = accountService;
