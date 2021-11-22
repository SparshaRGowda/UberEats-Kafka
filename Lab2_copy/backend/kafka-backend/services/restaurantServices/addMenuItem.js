//const generateToken = require('../../../utils/generateToken')
const db = require('../../../config/db')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../models/restaurantModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {
  try {
    const { restid, dishname, dishprice, dishquant, dishtype } = msg
    // console.log(item_photo_path)
    const restaurant = await Restaurant.findById(restid)
    if (restaurant) {
      //console.log(restaurant)
      const menuItem = {
        dishname,
        dishprice,
        dishquant,
        dishtype,
      }
      restaurant.rest_menu.push(menuItem)
      const result = restaurant.save()
      if (result) {
        const result = {
          message: 'Item Added Successfully!',
        }
        callback(null, result)
      } else {
        const err = {
          error:
            'Unable to add the Menu item at this time. Please try again later.',
        }
        callback(err, null)
      }
    } else {
      const err = {
        error: 'Restaurant Not Found!',
      }
      callback(err, null)
    }
  } catch (error) {
    console.log(error)
    const err = {
      error: 'Internal Server Error',
    }
    callback(err, null)
  }
}

exports.handle_request = handle_request
