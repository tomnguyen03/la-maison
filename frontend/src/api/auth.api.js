import http from 'src/utils/http'

const authApi = {
  register(data) {
    return http.post('auth/register/user', data)
  },
  login(data) {
    return http.post('auth/login', data)
  },
  changePassword(data) {
    return http.put('auth/change-password', data)
  },
  update(data) {
    return http.put('auth/update', data)
  }
}

export default authApi
