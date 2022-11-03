const commentService = require("../services/comment.service");

const commentController = {
  createComment: async (req, res) => {
    try {
      const accountId = req.user._id;
      if (!req.body) {
        throw new Error("Invalid Input value");
      }
      const data = {
        accountId: accountId,
        cafeId: req.body.cafeId,
        content: req.body.content,
      };
      const response = await commentService.createOne(data);

      return res.status(200).json({ message: "Successfully", data: response });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  getListComment: async (req, res) => {
    try {
      const cafeId = req.params.id;

      const comment = await commentService.find({
        cafeId: cafeId,
      });

      const response = {
        message: "Sucessfully",
        data: comment,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentController;
