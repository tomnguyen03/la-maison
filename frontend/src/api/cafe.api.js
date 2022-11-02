import http from 'src/utils/http'

const cafeApi = {
  createCafe(data) {
    return http.post(`cafe`, data)
  },

  getCafe() {
    return http.get(`cafe`)
  },

  getDetailCafe(data) {
    return http.get(`cafe/${data}`)
  },

  createLikeCafe(data) {
    return http.post(`like-cafe/${data}`)
  },

  getLikeCafe(data) {
    return http.get(`like-cafe/${data}`)
  },

  deleteLikeCafe(data) {
    return http.delete(`like-cafe/${data}`)
  }
}

export default cafeApi
