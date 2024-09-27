
import { displayUsers } from './getUsers.js'

export function makeLogin(form){
    const formData = new FormData(form)
    const alertSM = document.getElementById("alert");

    if (formData.get('email') == '') {
      alertSM.innerHTML = '<p class="alert alert-danger">Email is required</p>'
    } else if (formData.get('password') == '') {
      alertSM.innerHTML = '<p class="alert alert-danger">Password is required</p>'
    } else {
      alertSM.innerHTML = ''
      
      fetch(
        `${window.location.origin}/login`,
        {
          method: "POST",
          body: formData
        }
      ).then((resp) => resp.json())
        .then((data) => {
          if (data.is_logged == false) {
            alertSM.innerHTML = `<p class="alert alert-danger">Username or password wrong</p>`
          } else {
            localStorage.setItem('user_is_logged', data.is_logged)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
            //alertSM.innerHTML = `<p class="alert alert-success">${data.user.name} you've logged successfully </p>`
            console.log(localStorage.getItem('user'))
            displayUsers()
          }

        })
        .catch((err) => {
          console.error(err)
          alertSM.innerHTML = `<p class="alert alert-danger">Failed to login. ${err}</p>`
        })

    }


}