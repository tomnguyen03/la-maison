import http from 'src/utils/http'

const suggestApi = {
  createSuggest(data) {
    return http.post('share-location', data)
  },
  getListSuggest(data) {
    return http.get('share-location', data)
  }
}

export default suggestApi
