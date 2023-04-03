const express = require('express')
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mongoose = require('mongoose')
const clientrouter = require('./user/route')

const adminrouter = require('./admin/route')
const cookieParser = require('cookie-parser');
const { user_locals } = require('./helper/helper');
const { userModel } = require('./user/core/db/user');
const { chatModel } = require('./user/core/db/chat');

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http);

//conecting mongoose
const base = 'mongodb+srv://emmaro:1234@tutorial.klpqo.mongodb.net/mytaskchat?retryWrites=true&w=majority'

mongoose.connect(base)
.then((result) => console.log('rose-base has connected'))
.catch((err) => console.log(err, 'error has ocured in rose-base'))
//end




//
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.get('*', user_locals)
app.post('*', user_locals)
app.set('view engine', 'ejs')
//using routes middleware
app.use(clientrouter)
app.use('/admin', adminrouter)

let users = new Map()

http.listen(9000, () => console.log('coonected'))

io.on("connection",(socket)=>{
    // global.chatSocket = socket;
   let peopleId
    socket.on("add-user", async (userId) => {
        peopleId = userId
         await userModel.findByIdAndUpdate(userId, {
            $set: {
                status: 'online'
            }
        }) 
        users.set(userId, socket.id)
        console.log('this is userid ; ' , users)
    });


    socket.on("send-message", async (payload) => {
      console.log('this is payload', payload)
   const talk =   await new chatModel({
    users: [
        payload.userid,
        payload.friendid
    ], message:payload.msg , sender :payload.userid
   })
        await talk.save()
        //send the message to the other user 
        console.log('all users' , users)
        const usersocketid = users.get(payload.friendid)
        const chat = { userId: payload.userid, friendId: payload.friendid, message: payload.msg , sender:payload.userid}
        if (usersocketid) {
            console.log('wworking socket',usersocketid)
            socket.to(usersocketid).emit("msg-recieved",chat);
        } else {
            console.log('notavillable')
        }
    });
    socket.on("type-msg", async (payload) => {
      console.log('this is payload', payload)
      const usersocketid = users.get(payload.friendid)
      if (usersocketid) {
          console.log('wworking socket',usersocketid)
          socket.to(usersocketid).emit("type-msg-received",payload);
      } else {
          console.log('notavillable')
      }
      
    });
    

    socket.on("disconnect", async () => {
         await userModel.findByIdAndUpdate(peopleId, {
            $set: {
                status: 'offline'
            }
        }) 
        console.log('user is offline', peopleId)
    });

    // console.log('this is socket', socket.id)
    // socket.on("send-msg", (data) => {
    //   console.log('this is data for emiting ; ' , data)
    //     const sendUserSocket = onlineUsers.get(data.to);
    //     if(sendUserSocket) {
    //         socket.to(sendUserSocket).emit("msg-recieved",data);
    //     }
    // });
  });