import http from 'src/utils/http'

const staffApi = {
  getSuggestList() {
    return http.get('share-location')
  }
}

export default staffApi
