import { getLoginFormHtml } from "./loginHtmlForm.js";
import { logout_session } from './logout.js'
import { makeLogin } from './login.js'
import { displayUsers } from './getUsers.js'

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()

    const htmlLoginForm = getLoginFormHtml();

    const user_is_logged = localStorage.getItem("user_is_logged");
    const user = JSON.parse(localStorage.getItem("user"));

    if (String(user_is_logged)==='null' || String(user_is_logged)==='false'
    || user_is_logged === null || user_is_logged === false){
        document.getElementById('main-content').innerHTML = htmlLoginForm
    }else if (String(user_is_logged)==='true'
    || user_is_logged === true){
        displayUsers()

        const username = document.getElementById('username')
        username.style.display = 'block'
        username.innerText = user.name

    }
 

  const form = document.getElementById("form-login");
  const logoutButton = document.getElementById('logout')
  const alertSM = document.getElementById("alert");
  


  const controller = new AbortController();
try {    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        makeLogin(form)
    })
} catch (error) {
    console.log(`The login form was not found. ${error}`)
}


    // Logout event
    document.getElementById('logout').addEventListener('click', (e)=>{
        e.preventDefault()
        logout_session()
    })

});
