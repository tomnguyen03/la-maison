const cafeService = require('../services/cafe.service')
const formidable = require('formidable')
const uploader = require('../../config/cloudinary/cloudinary.config')
const addressService = require('../services/address.service')
const filterService = require('../services/filter.service')
const likeCafeService = require('../services/like_cafe.service')
const bookmarkService = require('../services/bookmark.service')
const lodash = require('lodash')
const axios = require('axios')
const ratingService = require('../services/rating.service')

const cafeController = {
  createCafe: async (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err)
        return
      }

      try {
        const accountId = req.user._id
        const images = []

        if (
          Object.keys(files).length === 0 &&
          files.constructor === Object
        ) {
          if (typeof fields.images === 'string') {
            const { url } = await uploader(fields.images)
            images.push(url)
          } else {
            for (const filepath of fields.images) {
              const { url } = await uploader(filepath)
              images.push(url)
            }
          }
          fields = { ...fields, images: images }
          const response = await cafeService.createOne({
            ...fields,
            isActive: true,
            register_by: accountId
          })

          res
            .status(200)
            .json({ message: 'Successfully', data: response })
        } else {
          if (files.images.length) {
            for (const file of files.images) {
              const { filepath } = file

              const { url } = await uploader(filepath)
              images.push(url)
            }
          } else {
            const filepath = files.images.filepath

            const { url } = await uploader(filepath)
            images.push(url)
          }

          const data = {
            ...fields,
            images: images,
            register_by: accountId
          }
          const response = await cafeService.createOne({
            ...data,
            isActive: true
          })

          res
            .status(200)
            .json({ message: 'Successfully', data: response })
        }
      } catch (error) {
        return res
          .status(400)
          .json({ message: error.message, data: error })
      }
    })
  },

  searchCafe: async (req, res) => {
    try {
      let query = {}
      let listCafe = {}

      if (!lodash.isEmpty(req.query.search)) {
        query['name'] = new RegExp(req.query.search, 'i')
        listCafe = await cafeService.search(query)
      }

      const response = {
        message: 'Lấy danh sách list cafe thành công',
        data: listCafe
      }

      return res.status(200).json(response)
    } catch (error) {}
  },

  getListCafe: async (req, res) => {
    try {
      let query = {}

      query['limit'] = 15
      query['page'] = req.query.page

      if (!lodash.isEmpty(req.query.search))
        query['name'] = new RegExp(req.query.search, 'i')
      if (!lodash.isEmpty(req.query.location))
        query['districtId'] = req.query.location
      if (!lodash.isEmpty(req.query.style))
        query['style_id'] = { $in: [req.query.style] }
      if (!lodash.isEmpty(req.query.vibe))
        query['vibe_id'] = { $in: [req.query.vibe] }

      let listCafe = []
      let totalItem = 0
      if (!lodash.isEmpty(req.query)) {
        listCafe = await cafeService.find(query)
        totalItem = await cafeService.count(query)
      } else {
        listCafe = await cafeService.find()
        totalItem = await cafeService.count()
      }

      const response = {
        message: 'Lấy danh sách list cafe thành công',
        data: listCafe,
        totalItem: totalItem
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },

  getListLocationCafe: async (req, res) => {
    const list = await cafeService.findLocation()

    const response = {
      message: 'Lấy danh sách list location',
      data: list
    }

    return res.status(200).json(response)
  },

  getCafeDetail: async (req, res) => {
    try {
      const listCafeDetail = await cafeService.findById(req.params.id)

      const getWard = await addressService.getWardsByCode({
        code: listCafeDetail.wardId
      })

      const detail_address =
        listCafeDetail.detail_address + ', ' + getWard.path

      const listStyle = await Promise.all(
        listCafeDetail.style_id.map(
          async item =>
            await filterService.styleFindById({ _id: item })
        )
      )

      const listVibe = await Promise.all(
        listCafeDetail.vibe_id.map(
          async item =>
            await filterService.vibeFindById({ _id: item })
        )
      )

      listCafeDetail['detail_address'] = detail_address
      listCafeDetail['style_id'] = listStyle
      listCafeDetail['vibe_id'] = listVibe

      const likeCount = await likeCafeService.count({
        cafeId: req.params.id
      })

      if (req.user) {
        const isBookmark = await bookmarkService.findOne({
          accountId: req.user._id,
          cafeId: req.params.id
        })

        const itemLikeCafe = await likeCafeService.findOne({
          accountId: req.user._id,
          cafeId: req.params.id
        })

        //Rating
        const ratingData = await ratingService.findOne({
          accountId: req.user._id,
          cafeId: req.params.id
        })

        if (lodash.isEmpty(ratingData)) {
          await ratingService.createOne({
            accountId: req.user._id,
            cafeId: req.params.id,
            view_count: 1,
            rating: 1
          })
        } else {
          let view_count = ratingData.view_count + 1
          let rating = ratingData.rating

          if (view_count === 5) {
            rating = rating + 1
          }

          await ratingService.update(req.user._id, req.params.id, {
            view_count: view_count,
            rating: rating
          })
        }

        const data = {
          ...listCafeDetail._doc,
          like_count: likeCount,
          isLike: (itemLikeCafe && true) || false,
          isBookmark: (isBookmark && true) || false
        }

        const response = {
          message: 'Lấy danh sách cafe thành công',
          data: data
        }

        return res.status(200).json(response)
      } else {
        const response = {
          message: 'Lấy danh sách cafe thành công',
          data: { ...listCafeDetail._doc, like_count: likeCount }
        }

        return res.status(200).json(response)
      }
    } catch (error) {
      return error
    }
  },

  updateAllCafe: async (req, res) => {
    try {
      const list = await cafeService.find()
      const GOONG_API_KEY = '4OJppCx27xeE76XzqGo5nuqljr5zJoV4fdYzhyul'

      list.map(async item => {
        const id = item._id

        const getWard = await addressService.getWardsByCode({
          code: item.wardId
        })

        const detail_address =
          item.detail_address + ', ' + getWard.path

        let location = {}

        await axios
          .get(
            `https://rsapi.goong.io/geocode?api_key=${GOONG_API_KEY}&address=${detail_address}`
          )
          .then(
            data =>
              (location = data.data.results[0].geometry.location)
          )
          .catch(error => console.log(error))

        await cafeService.update(id, { location: location })
      })

      const list1 = await cafeService.find()

      return res.status(200).json(list1)
    } catch (error) {
      console.log(error)
    }
  },

  getCafesRecommend: async (req, res) => {
    const userId = req.user
    if (lodash.isEmpty(userId)) {
      await cafeController.getListCafe(req, res)
    } else {
      const ratingHistory = await ratingService.find({
        accountId: userId._id
      })

      if (lodash.isEmpty(ratingHistory)) {
        await cafeController.getListCafe(req, res)
      } else
        await cafeService.getCafesRecommends(req, res, userId._id)
    }
  }
}

module.exports = cafeController
