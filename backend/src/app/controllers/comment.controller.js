const commentService = require("../services/comment.service");
const likeCommentService = require("../services/like_comment.service");
const dislikeCommentService = require("../services/dislike_comment.service");

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

      if (!req.user) {
        const data = await Promise.all(
          comment.map(async (item) => {
            const likeComment = await likeCommentService.count({
              commentId: item._id,
            });
            const dislikeComment = await dislikeCommentService.count({
              commentId: item._id,
            });
            return { ...item._doc, like_count: likeComment, dislike_count: dislikeComment };
          })
        );

        const response = {
          message: "Sucessfully",
          data: data,
        };

        return res.status(200).json(response);
      } else {
        const data = await Promise.all(
          comment.map(async (item) => {
            const data = { commentId: item._id, accountId: req.user._id };
            const likeComment = await likeCommentService.count({
              commentId: item._id,
            });
            const dislikeComment = await dislikeCommentService.count({
              commentId: item._id,
            });
            const isLike = await likeCommentService.findOne(data);
            const isDislike = await dislikeCommentService.findOne(data);

            return {
              ...item._doc,
              like_count: likeComment,
              dislike_count: dislikeComment,
              isLike: (isLike && true) || false,
              isDislike: (isDislike && true) || false,
            };
          })
        );

        const response = {
          message: "Sucessfully",
          data: data,
        };

        return res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentController;
