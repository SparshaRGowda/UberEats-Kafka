//const generateToken = require('../../../utils/generateToken')
const db = require('../../../config/db')
const bcrypt = require('bcryptjs')
const Order = require('../../../models/orderModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {
  try {
    console.log(msg)
    const orders = await Order.find({ userid: msg })
    if (orders) {
      // console.log(typeof orders)
      //console.log(orders.length)

      callback(orders, null)
    } else {
      callback(null, 'No Orders Found')
    }
  } catch (error) {
    console.log(error)
    callback(null, 'Internal Server Error')
  }
}

exports.handle_request = handle_request
