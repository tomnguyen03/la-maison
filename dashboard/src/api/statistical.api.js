import http from 'src/utils/http'

const statisticalApi = {
  getCount() {
    return http.get('count')
  },

  statisticalUser() {
    return http.get('auth/statistical')
  },

  getAllUser() {
    return http.get('auth/user')
  },

  getAllCafe() {
    return http.get('/cafe')
  }
}

export default statisticalApi
