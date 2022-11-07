import http from 'src/utils/http'

const collectionApi = {
  createCollection(data) {
    return http.post('collection', data)
  },
  getCollection(data) {
    return http.get('collection', data)
  },
  createBookmark(data) {
    return http.post('bookmark', data)
  },
  getBookmark(data) {
    return http.post(`bookmark/${data}`)
  },
  deleteBookmark(data) {
    return http.delete(`bookmark`, data)
  }
}

export default collectionApi
