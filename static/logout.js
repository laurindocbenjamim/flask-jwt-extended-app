



export function logout_session(){

  const access_token = localStorage.getItem('access_token')
  const user = localStorage.getItem('user')

  const headers = new Headers()
    headers.append('Authorization', ` Bearer ${access_token}`)
    headers.append('Content-Type', 'application/json')

    const endPoint = `${window.location.origin}/logout`
    const dataForm = new FormData()
    dataForm.append('token', access_token)

    fetch(endPoint, { method: 'POST', body: dataForm, headers: headers })
    .then((response) => response.json())
    .then((data) => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      localStorage.removeItem('user_is_logged')
      localStorage.clear()

      console.log("Loggin out")
      console.log(data)
    })
    .catch((err) => console.error(`Error to logout ${err}`))
}