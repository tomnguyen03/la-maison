import http from 'src/utils/http'

const authApi = {
  register(data) {
    return http.post('auth/register/user', data)
  },
  login(data) {
    return http.post('auth/login', data)
  }
}

export default authApi
