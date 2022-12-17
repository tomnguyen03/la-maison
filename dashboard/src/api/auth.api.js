import http from 'src/utils/http'

const authApi = {
  login(data) {
    return http.post('auth/login', data)
  },

  updateActive(data) {
    return http.put('auth/updateActive', data)
  },

  updateRole(data) {
    return http.put('auth/updateRole', data)
  },

  getRole() {
    return http.get('auth/roles')
  }
}

export default authApi
