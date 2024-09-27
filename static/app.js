import { getLoginFormHtml } from "./loginHtmlForm.js";
import { logout_session } from './logout.js'
import { makeLogin } from './login.js'

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()

  const htmlLoginForm = getLoginFormHtml();

  document.getElementById('main-content').innerHTML = htmlLoginForm

  const form = document.getElementById("form-login");
  const logoutButton = document.getElementById('logout')
  const alertSM = document.getElementById("alert");
  


  const controller = new AbortController();

  const user_is_logged = localStorage.getItem("user_is_logged");

  if (!user_is_logged) {
    // First display the login form
    //setLoginFormHtml()
  } else {
    //displayUsers()
  }

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        makeLogin(form)
    })


    // Logout event
    document.getElementById('logout').addEventListener('click', (e)=>{
        e.preventDefault()
        logout_session()
    })

});
