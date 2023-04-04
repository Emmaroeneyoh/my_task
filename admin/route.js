const { admin_auth } = require('../helper/helper')
const { admin_signup_page, createadmin, loginadmin } = require('./controller/auth')
const { AdminHomepage, alluserpage, allsuspenduserpage } = require('./controller/preview')
const { delete_user, suspend_user, unsuspend_user } = require('./controller/user.setting')


const router = require('express').Router()
 
router.get('/', admin_auth ,  AdminHomepage)
router.get('/signup', admin_signup_page)
router.post('/signup', createadmin)
router.post('/login', loginadmin)

//dashboard
router.get('/users', alluserpage)
router.get('/delete/user/:id', delete_user)
router.get('/suspend/user/:id', suspend_user)
router.get('/unsuspend/user/:id', unsuspend_user)



module.exports = router