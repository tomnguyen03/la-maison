const StyleModel = require('../models/style.model')
const VibeModel = require('../models/vibe.model')

const filterService = {
  styleFind: async data => {
    try {
      return StyleModel.find(data)
    } catch (error) {
      return error
    }
  },

  styleFindById: async data => {
    try {
      return StyleModel.findOne(data)
    } catch (error) {
      return error
    }
  },

  vibeFind: async data => {
    try {
      return VibeModel.find(data)
    } catch (error) {
      return error
    }
  },

  vibeFindById: async data => {
    try {
      return VibeModel.findOne(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = filterService
