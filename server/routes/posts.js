const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paginate = require("../middleware/paginate");
const upload = require("../middleware/upload");
const { Post } = require("../models/Post");
const {
  getPosts,
  createPost,
  sharePost,
  getPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/posts");
const {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  createReply,
  updateReply,
  deleteReply,
  likeReply,
} = require("../controllers/comments");

router.use(auth);
router
  .route("/")
  .get(paginate(Post), getPosts)
  .post(upload.array("files"), createPost);
router
    .route("/:id")
    .get(getPost)
    .patch(updatePost).
    delete(deletePost);
router.route("/:id/shares").post(sharePost);
router.route("/:id/likes").patch(likePost);
router.route("/:postId/comments").post(createComment);
router.route("/:postId/comments").post(createComment);
router
  .route("/:postId/comments/:commentId")
  .patch(updateComment)
  .delete(deleteComment);

router.route("/:postId/comments/:commentId/likes")
  .post(likeComment)

router.route("/:postId/comments/:commentId/replies").post(createReply);
router
  .route("/:postId/comments/:commentId/replies/:replyId")
  .patch(updateReply)
  .delete(deleteReply);
router
  .route("/:postId/comments/:commentId/replies/:replyId/likes")
  .put(likeReply);

module.exports = router;
