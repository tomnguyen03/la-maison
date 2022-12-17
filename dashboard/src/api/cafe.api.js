import http from 'src/utils/http'

const cafeApi = {
  updateActiveCafe(data) {
    return http.put('cafe/updateActive', data)
  }
}

export default cafeApi
