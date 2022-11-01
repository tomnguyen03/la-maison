class Path {
  constructor() {
    this.home = '/'
    this.user = '/user'
    this.profile = '/profile'
    this.upload = '/upload'
    this.password = '/password'
    this.suggestAPlace = '/suggest_a_place'
    this.createCafe = '/create-cafe'
    this.cafe = '/cafe'
    this.detailCafe = '/cafe/:idCafe'
  }
}

export const path = new Path()
