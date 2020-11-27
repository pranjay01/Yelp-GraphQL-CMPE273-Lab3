/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserSignup = require('../Models/UserSignup');

// const { auth } = require('../Utils/passport');

// auth();

const login = async (args) => {
  let results = {};
  try {
    const user = await UserSignup.findOne({ Email: args.Email, Role: args.Role });
    if (user && (await bcrypt.compare(args.Password, user.Password))) {
      results = user;
      results.Result = 'Login Success';
    } else {
      results.Result = 'Invalid Credentials';
    }
  } catch (error) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network error';
  }
  return results;
};

module.exports = { login };
