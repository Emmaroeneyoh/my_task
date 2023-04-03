const joi = require('joi');
const bcrypt = require('bcrypt');
const { adminModel } = require('../core/admindb');
const { create_token_admin } = require('../core/utils');



const admin_signup_page = async (req, res) => {
    try {
    //   const blog = await Blog.find()
    //   console.log(blog)
      res.render("admin/auth/signup")
    } catch (error) {
      console.log(error)
    }
}


const createadmin = async (req, res) => {
    try {
        // console.log(req.file)
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
        //extracting the data from the request
        const { email , username , password } = req.body
        const userEmail = email.toLowerCase()
        //bycrypting the password
        const salt = await bcrypt.genSalt();
        const Harshpassword = await bcrypt.hash(password, salt);
        const client = await adminModel.findOne({ email: userEmail });
        if (client) {
            const clienterror = ' user already exist with that email'
            throw clienterror
        }
        //saving user to db
        const newBlog = await new adminModel({
           username , email:userEmail , password:Harshpassword
        })
        const savedBlog = await newBlog.save()
        const token = create_token_admin(savedBlog._id)
        res.cookie('admincookie', token, { maxAge: 3* 24*60*60})
        res.json({ savedBlog })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

const loginadmin = async (req, res) => {
    try {
        // console.log(req.file)
        const schema = joi.object({
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
        //extracting the data from the request
        const { email ,  password } = req.body
        const userEmail = email.toLowerCase()
       
        const client = await adminModel.findOne({ email: userEmail });
        if (!client) {
            const clienterror = ' user dont  exist with that email'
            throw clienterror
        }
        const checkPassword = await bcrypt.compare(password, client.password);
        if (!checkPassword) {
            const clienterror = 'password is incorrect'
            throw clienterror
        }
        const token = create_token_admin(client._id)
        res.cookie('admincookie', token, { maxAge: 3* 24*60*60})
        res.json({ savedBlog : client })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

module.exports = {
    admin_signup_page , loginadmin , createadmin
}