const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    username:{
        type:String,
    },
   password: {
        type:String,
    },
    email:{
        type:String
    },
   profile_img:{
       type: String,
       default : ''
       
    },
    profile_img_id:{
        type: String,
        
       default : ''
    },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const adminModel = mongoose.model('admin', post_schema)
module.exports = {
    adminModel
}