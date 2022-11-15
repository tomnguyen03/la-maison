const authHelper = require('../../helpers/auth.helper')
const AccountModel = require('../models/account.model')

const accountService = {
  createOne: async data => {
    try {
      const account = new AccountModel(data)
      return account.save()
    } catch (error) {
      return error
    }
  },
  findOne: async data => {
    try {
      return AccountModel.findOne(data)
    } catch (error) {
      return error
    }
  },
  update: async (id, data) => {
    try {
      return AccountModel.updateOne({ _id: id }, data)
    } catch (error) {
      return error
    }
  },
  changePassword: async (userId, data) => {
    try {
      const user = authHelper.changePassword(userId, data)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = accountService
