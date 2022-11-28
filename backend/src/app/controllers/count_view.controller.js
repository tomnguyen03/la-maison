const countService = require('../services/count.service')
const lodash = require('lodash')

const countController = {
  createCount: async (req, res) => {
    try {
      if (!req.body) {
        throw new Error('Invalid Input value')
      }

      const url = req.body.url

      const countItem = await countService.findOne({ url: url })

      let data = {}

      console.log(countItem)
      if (lodash.isEmpty(countItem)) {
        data = {
          url: url,
          views: 1
        }
        await countService.createOne(data)
      } else {
        const views = countItem.views + 1

        data = {
          url: url,
          views: views
        }

        await countService.update(countItem._id, {
          views: views
        })
      }

      return res.json({ message: 'Successfully', data: data })
    } catch (error) {
      console.log(error)
    }
  },

  getCount: async (req, res) => {
    try {
      const listCount = await countService.find()

      const response = {
        message: 'Lấy danh sách list thành công',
        data: listCount
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = countController
