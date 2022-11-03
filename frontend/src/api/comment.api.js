import http from 'src/utils/http'

const commentApi = {
  createComment(data) {
    return http.post('comment', data)
  },
  getListComment(data) {
    return http.get(`comment/${data}`)
  },
  createLikeComment(data) {
    return http.post(`like-comment/${data}`)
  },
  deleteLikeComment(data) {
    return http.delete(`like-comment/${data}`)
  },
  createDislikeComment(data) {
    return http.post(`dislike-comment/${data}`)
  },
  deleteDislikeComment(data) {
    return http.delete(`dislike-comment/${data}`)
  }
}

export default commentApi
