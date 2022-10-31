import http from 'src/utils/http'

const cafeApi = {
  createCafe(data) {
    return http.post(`cafe`, data)
  }
}

export default cafeApi
