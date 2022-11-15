const collectionService = require('../services/collection.service')

const collectionController = {
  createCollection: async (req, res) => {
    try {
      const accountId = req.user._id
      if (!req.body) {
        throw new Error('Invalid Input value')
      }
      const data = {
        accountId: accountId,
        name: req.body.name
      }
      const collection = await collectionService.createOne({
        ...data,
        isActive: true
      })

      return res.json({ message: 'Successfully', data: collection })
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: error })
    }
  },

  getCollection: async (req, res) => {
    try {
      const listCollection = await collectionService.find({
        accountId: req.user._id
      })
      const response = {
        message: 'Lấy danh sách list collection thành công',
        data: listCollection
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = collectionController
