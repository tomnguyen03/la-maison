const cafeService = require('../services/cafe.service')
const formidable = require('formidable')
const uploader = require('../../config/cloudinary/cloudinary.config')
const addressService = require('../services/address.service')
const filterService = require('../services/filter.service')
const likeCafeService = require('../services/like_cafe.service')
const authMiddleware = require('../../resources/middleware/auth.middleware')

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

        if (Object.keys(files).length === 0 && files.constructor === Object) {
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
            register_by: accountId,
          })

          res.status(200).json({ message: 'Successfully', data: response })
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

          const data = { ...fields, images: images, register_by: accountId }
          const response = await cafeService.createOne({ ...data, isActive: true })

          res.status(200).json({ message: 'Successfully', data: response })
        }
      } catch (error) {
        return res.status(400).json({ message: error.message, data: error })
      }
    })
  },

  getListCafe: async (req, res) => {
    try {
      const listCafe = await cafeService.find()

      const response = {
        message: 'Lấy danh sách list cafe thành công',
        data: listCafe,
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },

  getCafeDetail: async (req, res) => {
    try {
      const listCafeDetail = await cafeService.findById(req.params.id)

      const getWard = await addressService.getWardsByCode({ code: listCafeDetail.wardId })

      const detail_address = listCafeDetail.detail_address + ', ' + getWard.path

      const listStyle = await Promise.all(
        listCafeDetail.style_id.map(
          async (item) => await filterService.styleFindById({ _id: item }),
        ),
      )

      const listVibe = await Promise.all(
        listCafeDetail.vibe_id.map(async (item) => await filterService.vibeFindById({ _id: item })),
      )

      listCafeDetail['detail_address'] = detail_address
      listCafeDetail['style_id'] = listStyle
      listCafeDetail['vibe_id'] = listVibe

      const response = {
        message: 'Lấy danh sách cafe thành công',
        data: listCafeDetail,
      }

      return res.status(200).json(response)
    } catch (error) {
      return error
    }
  },
}

module.exports = cafeController
