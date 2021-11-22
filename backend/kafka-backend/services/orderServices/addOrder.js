//const generateToken = require('../../../utils/generateToken')
const db = require('../../../config/db')
const bcrypt = require('bcryptjs')
const Order = require('../../../models/orderModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {
  let {
    userid,
    restid,
    orderstatus,
    order_details,
    ordertotal,
    special_instructions,
  } = msg
  console.log(msg)
  try {
    const order = await Order.create({
      userid,
      restid,
      orderstatus,
      order_total: ordertotal,
      order_details: order_details,
      special_instructions,
    })
    if (order) {
      const result = {
        message: 'Success',
      }
      callback(null, result)
    } else {
      callback('Order Fail!', null)
    }
  } catch (error) {
    callback('Internal Server Error', null)
  }
}

exports.handle_request = handle_request
