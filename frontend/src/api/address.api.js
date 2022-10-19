import http from 'src/utils/http'

const addressApi = {
  getProvinceByName(data) {
    return http.get(`address/provinces?name_province=${data}`)
  },

  getDistrictByProvince(data) {
    return http.get(`address/districts?code=${data}`)
  }
}

export default addressApi
