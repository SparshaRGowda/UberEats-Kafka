const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')
const Order = require('../models/orderModel')

const addOrder = async (req, res) => {
  kafka.make_request('add_order', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      console.log(results)
      res.status(201).json({
        results,
      })
    }
  })
}

const readOrder_user = async (req, res) => {
  try {
    // console.log(msg)
    const orders = await Order.find({ userid: req.params.userid })
    if (orders) {
      // console.log(typeof orders)
      //console.log(orders.length)

      //callback(orders, null)
      res.send(orders)
    } else {
      res.status(404).json({
        error: 'order not found',
      })
      //callback(null, 'No Orders Found')
    }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    })
  }
  /* console.log(req.params)
  kafka.make_request('get_order_user', req.params.userid, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      console.log(typeof results)
      res.status(201).send(results)
    }
  })*/
}

const readOrder_rest = async (req, res) => {
  try {
    // console.log(msg)
    const orders = await Order.find({ restid: req.params.restid })
    if (orders) {
      // console.log(typeof orders)
      //console.log(orders.length)

      //callback(orders, null)
      res.send(orders)
    } else {
      res.status(404).json({
        error: 'order not found',
      })
      //callback(null, 'No Orders Found')
    }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    })
  }
}

const updateOrder_rest = async (req, res) => {
  console.log(req.params)
  kafka.make_request('update_order_status', req.params, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      console.log(results)
      res.status(201).json({
        results,
      })
    }
  })
}

module.exports = { addOrder, readOrder_user, readOrder_rest, updateOrder_rest }
