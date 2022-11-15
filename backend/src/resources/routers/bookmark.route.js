const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/bookmark.controller')

route.post('', controller.createBookmark)
route.get('', controller.getBookmarkByAccountId)
route.delete('', controller.deleteBookmark)
route.get('/:collectionId', controller.getBookmarkByCollectionId)

module.exports = route
