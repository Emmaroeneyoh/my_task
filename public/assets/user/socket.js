
const userid = document.querySelector('#userid')
const username = document.querySelector('#username')
let personid = document.querySelector('#friendid')
let message = document.querySelector('#msg')
let button = document.querySelector('#button')
let onlinetext = document.querySelector('#onlinetext')
let wordtype = document.querySelector('#typing')
let text = []

let friendid
if (personid) {
    friendid = personid.value
    console.log('this is value' , friendid)
}

var socket = io('http://localhost:9000');

socket.on('connection')
const connect = () => {
    socket.emit('add-user', userid.value)
}

const cleartype = () => {
    wordtype.innerHTML = ''
}

socket.on('type-msg-received', (data) => {
    console.log('this is data', data)
    if (data.userid == friendid) {
        wordtype.innerHTML = `${data.username} is typing ...`
        setTimeout(cleartype, 2000);
    }
})
connect()


const updatehtml = () => {
 let result =   text.map((x) => {
     if (x.sender == userid.value.toString()) {
         return `
         <div class="row justify-content-end text-right mb-4">
                                                            <div class="col-auto">
                                                                <div class="card bg-gradient-primary text-white">
                                                                    <div class="card-body p-2">
                                                                        <p class="mb-1">
                                                                            ${x.message}
                                                                        </p>
                                                                        <div class="d-flex align-items-center justify-content-end text-sm opacity-6">
                                                                            <i class="fa fa-check-double mr-1 text-xs" aria-hidden="true"></i>
                                                                            <small>4:42pm</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>`
     } else {
         return `
         <div class="row justify-content-start mb-4">
                                                            <div class="col-auto">
                                                                <div class="card ">
                                                                    <div class="card-body p-2">
                                                                        <p class="mb-1">
                                                                          ${x.message}
                                                                        </p>
                                                                        <div class="d-flex align-items-center text-sm opacity-6">
                                                                            <i class="far fa-clock mr-1" aria-hidden="true"></i>
                                                                            <small>3:14am</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
         `
      }
 })
    onlinetext.innerHTML = result.join('')
}

const send_message = () => {
    const payload = {
        msg:message.value , userid:userid.value , sender:userid.value , friendid
    }
    socket.emit('send-message', payload)
    const chat = { userId: userid.value, friendId: friendid, message: message.value, sender: userid.value }
    console.log(chat)
    text.push(chat)
    message.value = ''
    updatehtml()
}
socket.on('msg-recieved', (data) => {
    console.log('this is data', data)
    text.push(data)
    updatehtml()
})
const typing = () => {
    const payload = {friendid , username:username.value , userid:userid.value}
    socket.emit('type-msg', payload)
   
}

document.addEventListener('keydown', function(event) {
   typing()
});

button.addEventListener('click', () => {
    send_message()
})