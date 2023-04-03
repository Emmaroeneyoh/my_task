

//for signup 
const form = document.querySelector('#signupform')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('working')
    const email = form.email.value
    const password = form.password.value
    const username = form.username.value
   const res = await fetch('/admin/signup', {
    method:'POST',
    body:JSON.stringify({email,password,username}),
    headers:{'Content-Type': 'application/json'}
   })
   const data = await res.json()
   console.log(data)
   if (data.savedBlog) {
       location.assign('/admin')
   }
   if (data.error) {
       console.log(data.error)
       swal({
           title: "Error",
           text: data.error,
           icon: "danger",
           button: "back to form",
         });
   }
})


//for signup 

const loginform = document.querySelector('#loginform')
loginform.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('working')
    const email = loginform.email.value
    const password = loginform.password.value
   const res = await fetch('/admin/login', {
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{'Content-Type': 'application/json'}
   })
   const data = await res.json()
   console.log(data)
   if (data.savedBlog) {
       location.assign('/admin')
   }
   if (data.error) {
       console.log(data.error)
       swal({
           title: "Error",
           text: data.error,
           icon: "danger",
           button: "back to form",
         });
   }
})