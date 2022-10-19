const provinceModel = require("../models/province.model");
const districtModel = require("../models/district.model");
const wardModel = require("../models/ward.model");

const addressService = {
  getAllProvinces: async () => {
    try {
      return provinceModel.find({});
    } catch (error) {
      return error;
    }
  },
  getProvinceByName: async (name) => {
    try {
      return provinceModel.find({ name: name });
    } catch (error) {
      return error;
    }
  },
  getDistrictByProvince: async (parentCode) => {
    try {
      return districtModel.find({ parent_code: parentCode });
    } catch (error) {
      return error;
    }
  },
  getWardByDistrict: async (parentCode) => {
    try {
      return wardModel.find({ parent_code: parentCode });
    } catch (error) {
      return error;
    }
  },

  getAllDistricts: async () => {
    try {
      return districtModel.find({});
    } catch (error) {
      return error;
    }
  },
  getAllWards: async () => {
    try {
      return wardModel.find({});
    } catch (error) {
      return error;
    }
  },
};

module.exports = addressService;
