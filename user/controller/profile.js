
const joi = require('joi')
const { userModel } = require('../core/db/user')
const { cloudinary } = require('../core/utils')



const update_page = async (req, res) => {
    try {
        const id = req.user
        const user = await userModel.findById(id._id)
      res.render("client/update" , {user})
    } catch (error) {
      console.log(error)
    }
}
//craete blog
const editprofile = async (req, res) => {
    try {
        console.log(req.body)
       
        //extracting the data from the request
        const { phone, location, username, email, } = req.body
       
        var query = {  }
       
        if (phone != "") {
              query.phone = phone
        }
        
        if (location != '') {
          query.location = location
        }
        if (username != '') {
          query.username = username
        }
        if (email != '') {
            userEmail = email.toLowerCase()
            const client = await userModel.findOne({ email: userEmail });
            if (client) {
                const clienterror = ' user already  exist with that email'
                throw clienterror
            }
          query.email = email
        }
        const user = req.user 
        console.log('this is uer', user._id)
        //checking for image
         
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            query.profile_img = result.secure_url
        } 
        //uploading the file 
      

        const updateuser = await userModel.findByIdAndUpdate(user._id, {
            $set: query
        })
        res.json({ savedBlog : "done" })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

module.exports = {
    editprofile  , update_page
}