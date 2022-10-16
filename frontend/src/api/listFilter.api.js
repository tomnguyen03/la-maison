import http from 'src/utils/http'

const listFilter = {
  getStyle() {
    return http.get('styles')
  },
  getVibes() {
    return http.get('vibes')
  }
}

export default listFilter
