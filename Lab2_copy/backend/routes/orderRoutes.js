const express = require('express')

const router = express.Router()

const {
  addOrder,
  readOrder_user,
  readOrder_rest,
  updateOrder_rest,
} = require('../controllers/OrderController')

router.post('/addorder', addOrder)
router.get('/getuserorder/:userid', readOrder_user)
router.get('/getrestorder/:restid', readOrder_rest)
router.put('/updaterestorder/:orderid/:orderstatus', updateOrder_rest)
module.exports = router
