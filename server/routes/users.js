const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Post } = require('../models/Post');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPosts,
  uploadCover,
  uploadProfile,
  addNewFriend,
  acceptRequest,
  deleteRequest,
  getFriends
} = require('../controllers/users');
const paginateUsers = require('../middleware/paginate-user');
const paginate = require('../middleware/paginate');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(auth);
router.route('/').get(getUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/:userId/posts').get(paginate(Post, true), getUserPosts);
router.route('/cover').post(upload.single('cover'), uploadCover);
router.route('/profile').post(upload.single('profile'), uploadProfile);
router
  .route('/:userId/friends')
  .get(getFriends)
  .post(addNewFriend)
  .put(acceptRequest)
  .delete(deleteRequest)

module.exports = router;
