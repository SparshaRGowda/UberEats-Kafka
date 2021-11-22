const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {
  const { firstName, email, password } = msg

  const userExists = await User.findOne({ email: msg.email })

  if (userExists) {
    callback({ error: 'User already exists' }, null)
  } else {
    const newUser = {
      firstName: msg.firstName,
      email: msg.email,
      password: msg.password,
    }

    const user = await User.create(newUser)

    if (user) {
      const result = {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      }

      callback(null, result)
    } else {
      callback('Internal Server Error!', null)
    }
  }
  callback('Success!', null)
}

exports.handle_request = handle_request
