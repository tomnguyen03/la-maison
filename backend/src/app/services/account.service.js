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
  find: async () => {
    try {
      return AccountModel.find()
        .populate('roleId')
        .select(
          '_id email roleId name avatar phone detail_address createdAt isActive'
        )
    } catch (error) {
      return error
    }
  },
  count: async () => {
    try {
      return AccountModel.count()
    } catch (error) {
      return error
    }
  },
  statistical: async () => {
    try {
      return AccountModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' },
              month_year: {
                $dateToString: { format: '%m/%Y', date: '$createdAt' }
              }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': -1, '_id.month': -1 }
        }
      ])
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
