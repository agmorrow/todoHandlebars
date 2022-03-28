const router = require('express').Router();
const {
  createUser,
  getAllUsers
} = require('../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

module.exports = router;