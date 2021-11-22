const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')
const Restaurant = require('../models/restaurantModel')

const registerRestaurant = asyncHandler(async (req, res) => {
  kafka.make_request('signup_restaurant', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      //res.status(201).json(results)
      res.status(200).send({
        results,
      })
    }
  })
})

const authRestaurant = asyncHandler(async (req, res) => {
  //console.log(req.userId)
  kafka.make_request('auth_restaurant', req.body, (err, results) => {
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
})

const addmenuItem = asyncHandler(async (req, res) => {
  kafka.make_request('add_item', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      //res.status(201).json(results)
      res.status(200).send({
        results,
      })
    }
  })
})

const getAllRestaurants = async (req, res) => {
  const result = await Restaurant.find()
  if (result) {
    //console.log(result)
    res.status(200).json({ result })
  } else {
    res.status(400).json({
      message: '500 Internal Server Error',
    })
  }
}

const getFilteredRestaurants = async (req, res) => {
  const result = await Restaurant.find({
    rtype: req.params.filtertype,
  })
  console.log(result)
  if (result) {
    res.json({
      result,
    })
  } else {
    res.status(500).json({
      'message:': 'Internal Server Error',
    })
  }
}

const FilterRestaurantsByLocation = async (req, res) => {
  console.log(req.params)
  const result = await Restaurant.find({
    rlocation: req.params.location,
  })
  if (result) {
    res.json({
      result,
    })
  } else {
    res.status(500).json({
      'message:': 'Internal Server Error',
    })
  }
}

module.exports = {
  registerRestaurant,
  authRestaurant,
  addmenuItem,
  getAllRestaurants,
  getFilteredRestaurants,
  FilterRestaurantsByLocation,
}
