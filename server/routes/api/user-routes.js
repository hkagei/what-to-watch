const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveMovie,
  deleteMovies,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/movies/:movieId').put(authMiddleware, saveMovie);

router.route('/movies/:movieId').delete(authMiddleware, deleteMovies);

module.exports = router;

// this file needs to be deleted
