import http from 'src/utils/http'

const createCafe = {
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
  },

  createCafe(data) {
    return http.post(`cafe`, data)
  },

  getStyle() {
    return http.get('styles')
  },

  getVibes() {
    return http.get('vibes')
  }
}

export default createCafe
