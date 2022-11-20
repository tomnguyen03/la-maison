const { isEmpty } = require('lodash')
const likeCafeService = require('../services/like_cafe.service')
const ratingService = require('../services/rating.service')

const likeCafeController = {
  createLikeCafe: async (req, res) => {
    try {
      const accountId = req.user._id
      if (!req.body) {
        throw new Error('Invalid Input value')
      }
      const data = {
        accountId: accountId,
        cafeId: req.params.id
      }
      const like_cafe = await likeCafeService.createOne(data)

      //Rating
      const ratingData = await ratingService.findOne(data)
      if (isEmpty(ratingData)) {
        await ratingService.createOne({
          accountId: accountId,
          cafeId: req.params.id,
          rating: 2
        })
      } else {
        await ratingService.update(accountId, req.params.id, {
          rating: ratingData.rating + 2
        })
      }

      return res.status(200).json({
        message: 'Successfully',
        data: like_cafe ? true : false
      })
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: error })
    }
  },

  getLikeCafeByAccountId: async (req, res) => {
    try {
      const cafeId = req.params.id

      const itemLikeCafe = await likeCafeService.findOne({
        accountId: req.user._id,
        cafeId: cafeId
      })

      const response = {
        message: 'Sucessfully',
        data: (itemLikeCafe && true) || false
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  deleteLikeCafeByAccountId: async (req, res) => {
    try {
      const cafeId = req.params.id

      await likeCafeService.deleteOne({
        accountId: req.user._id,
        cafeId: cafeId
      })

      const ratingData = await ratingService.findOne({
        accountId: req.user._id,
        cafeId: cafeId
      })

      await ratingService.update(req.user._id, cafeId, {
        rating: ratingData.rating - 2
      })

      const response = {
        message: 'Sucessfully'
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = likeCafeController
