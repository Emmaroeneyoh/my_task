const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   notificaton: {
        type:String,
        
    },
    userId: {
        type: String
    },
   
   
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const notificationModel = mongoose.model('notification', post_schema)
module.exports = {
    notificationModel
}