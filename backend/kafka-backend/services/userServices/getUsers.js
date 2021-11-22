const User = require('../../../models/userModel')

const handle_request = async (msg, callback) => {
  try {
    const users = await User.find({})

    console.log(`Input Messge Get Users: ${msg}`)

    if (users) {
      callback(null, users)
    } else {
      const err = {
        error: 'Users Not Found!',
      }
      callback(err, null)
    }
  } catch (error) {
    const err = {
      error: 'Internal Server Error',
    }
    callback(err, null)
  }
}

exports.handle_request = handle_request
