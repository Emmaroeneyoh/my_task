const { chatModel } = require("../core/db/chat")
const { userModel } = require("../core/db/user")
const { format_date } = require("../../helper/helper")

const UserHomepage = async (req, res) => {
  try {
      console.log('home1')
      const user = req.user
    const friendId = req.params.id
    const myid = user._id.toString()
      const blog = await userModel.findById({ _id: user._id })
      const users = await userModel.find({_id: { $ne: user._id},})
      let chat 
      let friend
      if (friendId) {
        console.log(myid)
         chat = await chatModel.find({users:{
          $all: [ myid, friendId],
         }
         })
        console.log('this is chat', chat)
         friend = await userModel.findById(friendId)
        return  res.render("client/home" ,{user:blog , users , chat , friend , myid , format_date})
      }
    
     res.render("client/home" ,{user:blog , users , friend:false , chat:false , format_date})
    } catch (error) {
      console.log(error)
    }
}

const suspended_page = async (req, res) => {
  try {
  //   const blog = await Blog.find()
  //   console.log(blog)
    res.render("client/suspended")
  } catch (error) {
    console.log(error)
  }
}
  
module.exports = {
    UserHomepage,suspended_page
}