const express = require('express')
const router = express.Router()
const {
  registerUser,
  getUsers,
  authUser,
} = require('../controllers/userController')
//const protect = require('../middleware/authMiddleware')

router.route('/signUp').post(registerUser)

router.route('/getUsers').get(getUsers)

router.route('/authUser').post(authUser)

module.exports = router
