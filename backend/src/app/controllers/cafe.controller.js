const cafeService = require("../services/cafe.service");
const formidable = require("formidable");
const uploader = require("../../config/cloudinary/cloudinary.config");

const cafeController = {
  createCafe: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      try {
        const accountId = req.user._id;
        const images = [];

        if (Object.keys(files).length === 0 && files.constructor === Object) {
          if (typeof fields.images === "string") {
            const { url } = await uploader(fields.images);
            images.push(url);
          } else {
            for (const filepath of fields.images) {
              const { url } = await uploader(filepath);
              images.push(url);
            }
          }
          fields = { ...fields, images: images };
          const response = await cafeService.createOne({ ...fields, isActive: true, register_by: accountId });

          res.status(200).json({ message: "Successfully", data: response });
        } else {
          if (files.images.length) {
            for (const file of files.images) {
              const { filepath } = file;

              const { url } = await uploader(filepath);
              images.push(url);
            }
          } else {
            const filepath = files.images.filepath;

            const { url } = await uploader(filepath);
            images.push(url);
          }

          const data = { ...fields, images: images, register_by: accountId };
          const response = await cafeService.createOne({ ...data, isActive: true });

          res.status(200).json({ message: "Successfully", data: response });
        }
      } catch (error) {
        return res.status(400).json({ message: error.message, data: error });
      }
    });
  },

  getListCafe: async (req, res) => {
    try {
      const listCafe = await cafeService.find();

      const response = {
        message: "Lấy danh sách list cafe thành công",
        data: listCafe,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },

  getCafeDetail: async (req, res) => {
    try {
      const listCafeDetail = await cafeService.findById(req.params.id);
      const response = {
        message: "Lấy danh sách list cafe thành công",
        data: listCafeDetail,
      };

      return res.status(200).json(response);
    } catch (error) {
      return error;
    }
  },
};

module.exports = cafeController;
