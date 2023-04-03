const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    username:{
        type:String,
    },
   location: {
        type:String,
        default : ''
    },
   password: {
        type:String,
        
    },
    email:{
        type:String
    },
    phone:{
        type: String,
        default : ''
    },
   profile_img:{
       type: String,
       default : ''
       
    },
    profile_img_id:{
        type: String,
        
       default : ''
    },
    account_suspended:{
        type: Boolean,
       default : false
    },
    status:{
        type: String,
       default : "online"
    },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const userModel = mongoose.model('user', post_schema)
module.exports = {
    userModel
}