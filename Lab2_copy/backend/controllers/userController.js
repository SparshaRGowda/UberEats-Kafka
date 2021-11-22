const asyncHandler = require('express-async-handler')
//const generateToken = require('../utils/generateToken')

const kafka = require('../kafka/client')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  kafka.make_request('signup_user', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      res.status(200).send({
        results,
      })
    }
  })
})

const getUsers = asyncHandler(async (req, res) => {
  kafka.make_request('get_users', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      res.status(200).json(results)
    }
  })
})

const authUser = async (req, res) => {
  //console.log(req.userId)
  kafka.make_request('auth_user', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      //console.log(results)
      //res.setHeader('token', 'jwt ' + results.token)
      res.status(200).send({
        results,
      })
    }
  })
}

module.exports = { registerUser, getUsers, authUser }
