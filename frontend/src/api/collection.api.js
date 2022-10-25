import http from 'src/utils/http'

const collectionApi = {
  createCollection(data) {
    return http.post('collection', data)
  },
  getCollection(data) {
    return http.get('collection', data)
  }
}

export default collectionApi
