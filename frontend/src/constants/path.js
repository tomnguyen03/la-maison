class Path {
  constructor() {
    this.home = '/'
    this.login = '/login'
    this.register = '/register'
    this.product = '/product'
    this.productDetail = '/product/:idProduct'
    this.cart = '/cart'
    this.payment = '/payment'
    this.user = '/user'
    this.profile = '/profile'
    this.password = '/password'
    this.purchase = '/purchase'
    this.admin = '/admin'
    this.dashboard = '/dashboard'
    this.customer = '/customer'
    this.notFound = '*'
  }
}

export const path = new Path()
