const express = require('express')
const router = express.Router()
const {
  registerRestaurant,
  authRestaurant,
  addmenuItem,
  getAllRestaurants,
  getFilteredRestaurants,
  FilterRestaurantsByLocation,
} = require('../controllers/restaurantController')

router.route('/restaurantSignUp').post(registerRestaurant)
router.route('/authRestaurant').post(authRestaurant)
router.route('/addItem').post(addmenuItem)
router.route('/getAllRestaurants').get(getAllRestaurants)
//router.route('/getRestaurant/:restid').get(getRestaurant)
router.route('/getFilteredRestaurants/:filtertype').get(getFilteredRestaurants)
router
  .route('/filterRestaurantByLocation/:location')
  .get(FilterRestaurantsByLocation)

module.exports = router
