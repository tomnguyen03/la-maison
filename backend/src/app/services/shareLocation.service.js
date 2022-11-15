const ShareLocationModel = require('../models/shareLocation.model')

const shareLocationService = {
  createOne: async data => {
    try {
      const shareLocation = new ShareLocationModel(data)
      return shareLocation.save()
    } catch (error) {
      return error
    }
  },
  find: async data => {
    try {
      return ShareLocationModel.find(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = shareLocationService
