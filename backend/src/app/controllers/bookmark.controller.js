const bookmarkService = require('../services/bookmark.service')
const cafeService = require('../services/cafe.service')
const collectionService = require('../services/collection.service')
const ratingService = require('../services/rating.service')
const lodash = require('lodash')

const bookmarkController = {
  createBookmark: async (req, res) => {
    try {
      const accountId = req.user._id
      if (!req.body) {
        throw new Error('Invalid Input value')
      }
      const data = {
        accountId: accountId,
        collectionId: req.body.collectionId,
        cafeId: req.body.cafeId
      }
      const bookmark = await bookmarkService.createOne(data)
      const cafe = await cafeService.findOne({ _id: req.body.cafeId })
      const collection = await collectionService.findOne({
        _id: req.body.collectionId
      })
      const images = collection.images
      images.push(cafe.images[0])
      await collectionService.update(req.body.collectionId, {
        images
      })

      //Rating
      const ratingData = await ratingService.findOne({
        accountId: accountId,
        cafeId: req.body.cafeId
      })
      if (lodash.isEmpty(ratingData)) {
        await ratingService.createOne({
          accountId: accountId,
          cafeId: req.body.cafeId,
          rating: 3
        })
      } else {
        await ratingService.update(accountId, req.body.cafeId, {
          rating: ratingData.rating + 3
        })
      }

      return res.json({ message: 'Successfully', data: bookmark })
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: error })
    }
  },

  getBookmarkByAccountId: async (req, res) => {
    try {
      const listBookmark = await bookmarkService.find({
        accountId: req.user._id
      })
      const response = {
        message: 'Lấy danh sách list bookmark thành công',
        data: listBookmark
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      const data = {
        accountId: req.user._id,
        cafeId: req.body.cafeId
      }

      await bookmarkService.deleteOne(data)

      //Rating
      const ratingData = await ratingService.findOne(data)
      await ratingService.update(req.user._id, req.body.cafeId, {
        rating: ratingData.rating - 3
      })

      const response = {
        message: 'Sucessfully'
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },

  getBookmarkByCollectionId: async (req, res) => {
    try {
      const collectionId = req.params.collectionId

      const collectionName = await collectionService.findOne({
        _id: collectionId
      })

      const data = await bookmarkService.find({
        collectionId: collectionId
      })

      const ListCafe = data.map(item => item.cafeId)

      const response = {
        message: 'Successfully',
        name: collectionName.name,
        data: ListCafe
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = bookmarkController
