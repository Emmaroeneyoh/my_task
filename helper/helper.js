const { userModel } = require("../user/core/db/user");
const moment = require('moment')
const jwt = require('jsonwebtoken')

const base_url = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const USER_AUTH_JWT = process.env.JWT;
const Admin_AUTH_JWT = process.env.Admin;


const format_date = function(date, format) {
    return moment(date).format('LT')
}

const user_auth = (req, res, next) => {
     const toke = req.cookies.usercookie;
     if(toke) {
         jwt.verify(toke, USER_AUTH_JWT , (err, decodedToken) => {
             if(err) {
                 //if error occurs in the processs of verifying
                 console.log('expiredd' , err.message)
                res.redirect('/signup')  
             } else {
                //  console.log(decodedToken)
                 next()
             }
         } )
     } else {
         res.redirect('/signup')
     }
}
const admin_auth = (req, res, next) => {
     const toke = req.cookies.admincookie;
     if(toke) {
         jwt.verify(toke, Admin_AUTH_JWT , (err, decodedToken) => {
             if(err) {
                 //if error occurs in the processs of verifying
                 console.log('expiredd' , err.message)
                res.redirect('/admin/signup')  
             } else {
                //  console.log(decodedToken)
                 next()
             }
         } )
     } else {
         res.redirect('/admin/signup')
     }
}

const user_locals = (req, res, next) => {
    //checking if the cookie used in signing up or logging exist
    const toke = req.cookies.usercookie;
    
//if it exist
    if(toke) {
        jwt.verify(toke, USER_AUTH_JWT, async (err, decodedToken) => {
            if(err) {
                console.log(err, 'error')
                res.locals.user = null
               next()
            } else {
                const peepo = await userModel.findById(decodedToken.user)
                res.locals.user = peepo
                req.user = peepo
                
                next()
            }
        } )
    } else {
        res.locals.user = null
        next()
    }
}
//check if user is suspended
const check_user_suspend = async (req, res, next) => {
     try {
         const userid = req.user._id
         const user = await userModel.findById(userid)
         if (user.account_suspended) {
            res.redirect('/suspended') 
         }
         next()
     } catch (error) {
        
     }
}


module.exports = {
  base_url,
  PORT,
  USER_AUTH_JWT, Admin_AUTH_JWT,
   format_date , user_locals , user_auth , check_user_suspend , admin_auth
};
