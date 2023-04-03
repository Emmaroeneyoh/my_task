const { format_date } = require("../../helper/helper")
const { userModel } = require("../../user/core/db/user")

const AdminHomepage = async (req, res) => {
    try {
      const blog = await userModel.find()
        
      res.render("admin/home" )
    } catch (error) {
      console.log(error)
    }
}
const alluserpage = async (req, res) => {
    try {
      const blog = await userModel.find()
        console.log(blog)
        
      res.render("admin/table" ,{ format_date , user:blog ,} )
    } catch (error) {
      console.log(error)
    }
}

const allsuspenduserpage = async (req, res) => {
    try {
      const blog = await userModel.find({account_suspended : true})
        console.log(blog)
        
      res.render("admin/suspenduser" ,{ format_date , user:blog ,} )
    } catch (error) {
      console.log(error)
    }
}
  
module.exports = {
    AdminHomepage , alluserpage , allsuspenduserpage
}