const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   message: {
        type:String,
        
    },
    users: Array,
    sender: {
        type:  mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
   
   
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const chatModel = mongoose.model('chat', post_schema)
module.exports = {
    chatModel
}