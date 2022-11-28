import http from 'src/utils/http'

const countApi = {
  updateCount(data) {
    return http.put('count', data)
  }
}

export default countApi
