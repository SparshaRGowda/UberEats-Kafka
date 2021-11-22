const Restaurant = require('../../../models/restaurantModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {
  // const { restname, remail, rpassword, rlocation, rtype, rdtype } = msg

  const restExists = await Restaurant.findOne({ remail: msg.remail })

  if (restExists) {
    callback({ error: 'Restaurant already exists' }, null)
  } else {
    const newRestaurant = {
      restname: msg.restname,
      remail: msg.remail,
      rpassword: msg.rpassword,
      rlocation: msg.rlocation,
      rtype: msg.rtype,
      rdtype: msg.rdtype,
      //rimage: msg.rimage,
    }

    const restaurant = await Restaurant.create(newRestaurant)

    if (restaurant) {
      const result = {
        _id: restaurant._id,
        restname: restaurant.restname,
        remail: restaurant.remail,
        rlocation: restaurant.rlocation,
        rtype: restaurant.rtype,
        rdtype: restaurant.rdtype,
        // rimage: restaurant.rimage,
      }

      callback(null, restaurant)
    } else {
      callback('Internal Server Error!', null)
    }
  }
  callback('Success!', null)
}

exports.handle_request = handle_request
