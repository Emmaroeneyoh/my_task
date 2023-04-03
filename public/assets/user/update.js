

const form = document.querySelector('.form')


form.addEventListener("submit",async (e) => {
    e.preventDefault()

    console.log('working')

    const payload = new FormData(form)

    console.log([...payload])
   const res = await fetch('/update', {
        method: 'POST',
        body: payload
    })

     const data = await res.json()
    console.log(data)
    if (data.savedBlog) {
        location.assign('/')
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