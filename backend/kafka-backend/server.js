var connection = new require('./kafka/Connection')
//topics files
//var signin = require('./services/signin.js');
var signup_user = require('./services/userServices/registerUser')
const get_users = require('./services/userServices/getUsers')
const auth_user = require('./services/userServices/authUser')
const auth_restaurant = require('./services/restaurantServices/authRestaurant')
const add_item = require('./services/restaurantServices/addMenuItem')
//const get_all_restaurants = require('./services/restaurantServices/addMenuItem')
const add_order = require('./services/orderServices/addOrder')
const get_order_user = require('./services/orderServices/getOrderUser')
const get_order_rest = require('./services/orderServices/getOrderRest')
const update_order_status = require('./services/orderServices/updateOrderStatus')

var signup_restaurant = require('./services/restaurantServices/registerRestaurant')

const connectdb = require('../config/db')

connectdb()

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name)
  var producer = connection.getProducer()
  console.log('server is running ')
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + ' ', fname)
    console.log(JSON.stringify(message.value))
    var data = JSON.parse(message.value)

    fname.handle_request(data.data, function (err, res) {
      console.log('after handle' + res)
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ]
      producer.send(payloads, function (err, data) {
        console.log(data)
      })
      return
    })
  })
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest('signup_user', signup_user)
handleTopicRequest('get_users', get_users)
handleTopicRequest('signup_restaurant', signup_restaurant)
handleTopicRequest('auth_user', auth_user)
handleTopicRequest('auth_restaurant', auth_restaurant)
handleTopicRequest('add_item', add_item)
handleTopicRequest('add_order', add_order)
handleTopicRequest('get_order_user', get_order_user)
handleTopicRequest('get_order_rest', get_order_rest)
handleTopicRequest('update_order_status', update_order_status)
