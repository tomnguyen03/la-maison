const CafeModel = require('../models/cafe.model')
const ratingModel = require('../models/rating.model')
const styleModel = require('../models/style.model')
const vibeModel = require('../models/vibe.model')
const cafeModel = require('../models/cafe.model')
const formatHelper = require('../../helpers/format.helper')
const { PythonShell } = require('python-shell')
const cafeHelper = require('../../helpers/cafe.helper')
const lodash = require('lodash')
const { getListPage } = require('../../helpers/cafe.helper')

const cafeService = {
  createOne: async data => {
    try {
      const cafe = new CafeModel(data)
      return cafe.save()
    } catch (error) {
      return error
    }
  },
  find: async data => {
    try {
      if (data) {
        let { limit, page, ...query } = data
        limit = Number.parseInt(limit)
        let skip = (Number.parseInt(page) - 1) * limit
        return CafeModel.find(query).limit(limit).skip(skip).lean()
      } else {
        return CafeModel.find().limit(5)
      }
    } catch (error) {
      return error
    }
  },

  findOne: async data => {
    try {
      if (data) {
        return cafeModel.findOne({ _id: data })
      }
    } catch (error) {
      return error
    }
  },

  findById: async data => {
    try {
      return CafeModel.findById(data)
    } catch (error) {
      return error
    }
  },

  count: async data => {
    try {
      return CafeModel.count(data)
    } catch (error) {
      return error
    }
  },

  update: async (id, data) => {
    try {
      return CafeModel.updateOne({ _id: id }, data)
    } catch (error) {
      return error
    }
  },

  getCafesRecommends: async (req, res, userId) => {
    try {
      // TODO: get rating by userId
      // TODO: get cafe with style_id, vibe_id, wardId
      // TOOD: likeCount of cafe by cafeId
      const [ratingHistory, styleIds, vibeIds] = await Promise.all([
        ratingModel
          .find({ accountId: userId })
          .select('accountId cafeId rating')
          .sort({ createdAt: -1 }),
        styleModel.find({}).select('_id'),
        vibeModel.find({}).select('_id')
      ])

      const cafes = await cafeModel
        .find({ isActive: true })
        .select('style_id vibe_id districtId')

      const cafeFormat = formatHelper.formatCafe(cafes)
      const styleIdsFormat = formatHelper.formatArrayIds(styleIds)
      const vibeIdsFormat = formatHelper.formatArrayIds(vibeIds)
      const ratingsFormat =
        formatHelper.formatRatingHistory(ratingHistory)

      PythonShell.run(
        'src/helpers/recommendSys.py',
        {
          args: [
            JSON.stringify(ratingsFormat),
            JSON.stringify(cafeFormat),
            JSON.stringify(styleIdsFormat),
            JSON.stringify(vibeIdsFormat)
          ],
          mode: 'text'
        },
        async (err, results) => {
          if (err) throw err
          response = results
          const cafeRecommend = JSON.parse(response[0])

          const cafeIdsRecommend =
            cafeHelper.getNumberCafesRecommend(cafeRecommend)

          let responseList = await Promise.all(
            cafeIdsRecommend.map(
              async item =>
                await cafeModel
                  .findById(item)
                  .select(
                    '_id name images detail_address districtId style_id vibe_id'
                  )
            )
          )

          let listPage = []

          //Search
          if (req.query.search) {
            const searchValue = new RegExp(req.query.search, 'i')
            responseList = responseList.filter(item =>
              searchValue.test(item.name)
            )
          }

          //Filter Location
          if (req.query.location) {
            responseList = responseList.filter(
              item => item.districtId == req.query.location
            )
          }

          //Filter Style
          if (req.query.style) {
            responseList = responseList.filter(item =>
              item.style_id.includes(req.query.style)
            )
          }

          //Filter Vibe
          if (req.query.vibe) {
            responseList = responseList.filter(item =>
              item.vibe_id.includes(req.query.vibe)
            )
          }

          //Pagination
          const limit = 9
          const page = req.query.page || 1

          listPage = getListPage(responseList, limit, page)

          return res.status(200).json({
            message: 'Successfully',
            data: listPage,
            totalItem: responseList.length
          })
        }
      )
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = cafeService
