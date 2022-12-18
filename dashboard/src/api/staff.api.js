import http from 'src/utils/http'

const staffApi = {
  getSuggestList() {
    return http.get('share-location')
  },
  updateApproval(data) {
    return http.put('share-location/update', data)
  }
}

export default staffApi
