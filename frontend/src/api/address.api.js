import http from 'src/utils/http'

const addressApi = {
  getAllProvince() {
    return http.get(`address/provinces`)
  },

  getProvinceByName(data) {
    return http.get(`address/provinces?name_province=${data}`)
  },

  getDistrictByProvince(data) {
    return http.get(`address/districts?code=${data}`)
  },

  getWardByDistrict(data) {
    return http.get(`address/wards?code=${data}`)
  }
}

export default addressApi
