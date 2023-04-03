const { userModel } = require("../../user/core/db/user")




const delete_user = async (req, res) => {
    try {
        const { id } = req.params  
       
        const updateBlog = await userModel.findByIdAndDelete(id)
        res.redirect('/admin/users')
        
    } catch (error) {
        console.log('this is error' , error)
    }
}

const suspend_user = async (req, res) => {
    try {
        const { id } = req.params  
        const updateBlog = await userModel.findByIdAndUpdate(id, { $set: { 
          account_suspended: true
        }
        })
        res.redirect('/admin/users')
    } catch (error) {
        
    }
}
const unsuspend_user = async (req, res) => {
    try {
        const { id } = req.params  
        const updateBlog = await userModel.findByIdAndUpdate(id, { $set: { 
          account_suspended: false
        }
        })
        res.redirect('/admin/users')
    } catch (error) {
        
    }
}


module.exports = {
    delete_user , suspend_user , unsuspend_user
}