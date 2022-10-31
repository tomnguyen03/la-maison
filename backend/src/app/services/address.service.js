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
  getProvinceByName: async (data) => {
    try {
      return provinceModel.find(data);
    } catch (error) {
      return error;
    }
  },
  getDistrictByProvince: async (data) => {
    try {
      return districtModel.find(data);
    } catch (error) {
      return error;
    }
  },
  getWardByDistrict: async (data) => {
    try {
      return wardModel.find(data);
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
