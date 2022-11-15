// const fileUploader = require("../../config/cloudinary/cloudinary.config");
const formidable = require('formidable')
const uploader = require('../../config/cloudinary/cloudinary.config')

const imageController = {
  fileUpload: (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err)
        return
      }

      if (
        Object.keys(files).length === 0 &&
        files.constructor === Object
      ) {
        res.json({ message: 'Successfully', data: fields })
      } else {
        const images = []

        if (files.images.length) {
          for (const file of files.images) {
            const { filepath } = file

            const { url } = await uploader(filepath)
            images.push(url)
          }
        } else {
          const filepath = files.images.filepath

          const { url } = await uploader(filepath)
          images.push(url)
        }

        const data = { ...fields, images: images }
        res.json({ message: 'Successfully', data: data })
      }
    })
  }
}

module.exports = imageController
