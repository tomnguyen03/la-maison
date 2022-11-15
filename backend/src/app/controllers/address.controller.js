const addressService = require('../services/address.service')

const addressController = {
  getAllProvinces: async (req, res) => {
    try {
      const provinceName = req.query.name_province

      if (provinceName) {
        const province = await addressService.getProvinceByName({
          name: provinceName
        })

        return res.json({ message: 'Successfully', data: province })
      }
      const address = await addressService.getAllProvinces()
      return res.json({ message: 'Successfully', data: address })
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, data: error })
    }
  },
  getDistrictByProvince: async (req, res) => {
    try {
      const cityCode = req.query.code

      if (!cityCode) {
        const districts = await addressService.getAllDistricts()
        return res.json({ message: 'Successfully', data: districts })
      }

      const districts = await addressService.getDistrictByProvince({
        parent_code: cityCode
      })
      return res.json({ message: 'Successfully', data: districts })
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, data: error })
    }
  },
  getWardByDistrict: async (req, res) => {
    try {
      const districtCode = req.query.code

      if (!districtCode) {
        const wards = await addressService.getAllWards()
        return res.json({ message: 'Successfully', data: wards })
      }
      const wards = await addressService.getWardByDistrict({
        parent_code: districtCode
      })
      return res.json({ message: 'Successfully', data: wards })
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, data: error })
    }
  }
}

module.exports = addressController
