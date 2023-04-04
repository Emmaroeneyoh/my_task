const { user_auth, check_user_suspend } = require('../helper/helper')
const { createuser, signup_page, loginuser } = require('./controller/auth')
const { UserHomepage, suspended_page } = require('./controller/preview')
const { update_page, editprofile } = require('./controller/profile')
const { upload } = require('./core/utils')

const router = require('express').Router()
 
router.get('/',  user_auth ,check_user_suspend, UserHomepage)
router.get('/signup', signup_page)
router.post('/signup', createuser)
router.post('/login', loginuser)
router.get('/suspended', suspended_page)


//update user 
router.get('/update', user_auth  ,update_page)
router.post('/update',  user_auth  ,upload.single("profile_img")  , editprofile)
router.get('/single/:id', user_auth  , UserHomepage)
module.exports = router