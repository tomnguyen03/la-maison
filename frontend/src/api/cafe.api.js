import http from 'src/utils/http'

const cafeApi = {
  createCafe(data) {
    return http.post(`cafe`, data)
  },

  getCafe() {
    return http.get(`cafe`)
  }
}

export default cafeApi
