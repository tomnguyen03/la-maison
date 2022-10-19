const addressService = require("../services/address.service");

const addressController = {
  getAllProvinces: async (req, res) => {
    try {
      const provinceName = req.query.name_province;

      if (provinceName) {
        const province = await addressService.getProvinceByName(provinceName);

        return res.json({ message: "Successfully", result: province });
      }
      const address = await addressService.getAllProvinces();
      return res.json({ message: "Successfully", result: address });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
  getDistrictByProvince: async (req, res) => {
    try {
      const cityCode = req.query.code;
      if (!cityCode) {
        const districts = await addressService.getAllDistricts();
        return res.json({ message: "Successfully", result: districts });
      }
      const districts = await addressService.getDistrictByProvince(cityCode);
      return res.json({ message: "Successfully", result: districts });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
  getWardByDistrict: async (req, res) => {
    try {
      const districtCode = req.query.code;
      if (districtCode) {
        const wards = await addressService.getAllWards();
        return res.json({ message: "Successfully", result: wards });
      }
      const wards = await addressService.getWardByDistrict(districtCode);
      return res.json({ message: "Successfully", result: wards });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
};

module.exports = addressController;
