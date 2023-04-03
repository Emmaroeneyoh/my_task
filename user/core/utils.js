
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2
const multer = require('multer')

const { USER_AUTH_JWT } = require('../../helper/helper');
//create jwt token for users when the signup or login 
const age = 1 * 24 * 60 * 60;
const create_token = (user) => {
  return jwt.sign({ user }, USER_AUTH_JWT, {
    expiresIn: age,
  });
};



cloudinary.config({
    cloud_name:'emmaroempire-com',
    api_key:'951785774252847',
    api_secret:'FT4e9SQilOylB5AstosaWqliUic',
})


//multer define/ setting up
const storage = multer.diskStorage({
    
  filename : (req, file, cb) => {
       cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({
  storage:storage,
  limits: 1034*1034 *5
})


module.exports = {
    create_token  ,  cloudinary  , upload
}