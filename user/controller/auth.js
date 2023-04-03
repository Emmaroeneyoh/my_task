const joi = require('joi');
const bcrypt = require('bcrypt');
const { userModel } = require('../core/db/user');
const { create_token, cloudinary } = require('../core/utils');


const signup_page = async (req, res) => {
    try {
    //   const blog = await Blog.find()
    //   console.log(blog)
      res.render("client/auth/signup")
    } catch (error) {
      console.log(error)
    }
}


const createuser = async (req, res) => {
    try {
        console.log("signup user")
        const schema = joi.object({
            username:joi.string().required(),
            email:joi.string().required(),
            password:joi.string().required(),
          })
        const { error } = schema.validate(req.body)
        console.log(error)
        let err;
        if (error) {
            err = error.details[0].message
            throw err
        }
        console.log("signing user 1")
        //extracting the data from the request
        const { email , username , phone , location , password } = req.body
        const userEmail = email.toLowerCase()
        //bycrypting the password
        const salt = await bcrypt.genSalt();
        const Harshpassword = await bcrypt.hash(password, salt);
        const client = await userModel.findOne({ email: userEmail });
        if (client) {
            const clienterror = ' user already exist with that email'
            throw clienterror
        }
        //saving user to db
        const newBlog = await new userModel({
           username , email:userEmail , password:Harshpassword
        })
        const savedBlog = await newBlog.save()
        console.log("signing user 3")
        const token = create_token(savedBlog._id)
        res.cookie('usercookie', token, { maxAge: 3 * 24 * 60 * 60 * 1000 })
        console.log("signing user 4")
        res.json({ savedBlog })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

const loginuser = async (req, res) => {
    try {
        // console.log(req.file)
        const schema = joi.object({
            email:joi.string().required(),
            password:joi.string().required(),
          })
        const { error } = schema.validate(req.body)
        console.log('this is error ' , error)
        let err;
        if (error) {
            err = error.details[0].message
            throw err
        }
        //extracting the data from the request
        const { email ,  password } = req.body
        const userEmail = email.toLowerCase()
       
        const client = await userModel.findOne({ email: userEmail });
        if (!client) {
            const clienterror = ' user dont  exist with that email'
            throw clienterror
        }
        const checkPassword = await bcrypt.compare(password, client.password);
        if (!checkPassword) {
            const clienterror = 'password is incorrect'
            throw clienterror
        }
        const token = create_token(client._id)
        res.cookie('usercookie', token, { maxAge: 3* 24*60*60 * 1000})
        res.json({ savedBlog : client })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}




module.exports = {
    createuser , signup_page , loginuser
}