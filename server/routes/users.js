const express = require('express');

const router = express.Router();
const { Post } = require('../models/Post');
const {
  getUsers,
  searchUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPosts,
  uploadCover,
  uploadProfile,
  deletePhoto,
  addNewFriend,
  acceptRequest,
  deleteRequest,
  getFriends
} = require('../controllers/users');
const paginate = require('../middleware/paginate');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(auth);
router.route('/').get(getUsers);
router.route('/search').get(searchUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/:userId/posts').get(paginate(Post, true), getUserPosts);
router.route('/cover').post(upload.single('cover'), uploadCover);
router.route('/profile').post(upload.single('profile'), uploadProfile);
router.route('/photos/:id').delete(deletePhoto);
router
  .route('/:userId/friends')
  .get(getFriends)
  .post(addNewFriend)
  .put(acceptRequest)
  .delete(deleteRequest)

module.exports = router;
