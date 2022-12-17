const roleModel = require('../models/role.model')

const RoleService = {
  findOne: async options => {
    try {
      return roleModel.findOne(options)
    } catch (error) {
      return error
    }
  },

  getRole: async () => {
    try {
      return roleModel.find()
    } catch (error) {
      return error
    }
  }
}

module.exports = RoleService
