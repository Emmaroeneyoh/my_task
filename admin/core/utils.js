
const jwt = require('jsonwebtoken');
const { USER_AUTH_JWT, Admin_AUTH_JWT } = require('../../helper/helper');
//create jwt token for users when the signup or login 
const age = 1 * 24 * 60 * 60;

const create_token_admin = (user) => {
  return jwt.sign({ user }, Admin_AUTH_JWT, {
    expiresIn: age,
  });
};



module.exports = {
    create_token_admin
}