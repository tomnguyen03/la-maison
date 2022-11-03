import http from 'src/utils/http'

const commentApi = {
  createComment(data) {
    return http.post('comment', data)
  },
  getListComment(data) {
    return http.get(`comment/${data}`)
  }
}

export default commentApi
