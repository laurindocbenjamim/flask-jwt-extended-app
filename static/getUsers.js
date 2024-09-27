
export async function displayUsers(){
  

  var access_token = localStorage.getItem('access_token')
    const user = localStorage.getItem('user')
    const controller = new AbortController();

  const user_is_logged = localStorage.getItem('user_is_logged')
        
    if(access_token === null | access_token === ''){
      console.log("Token was not found")
      alert("Token was not found")
      return
    }

  const headers = new Headers()
  headers.append('Authorization', ` Bearer ${access_token}`)
  headers.append('Content-Type', 'application/json')
  const endpoint = `${window.location.origin}/get-users`;
  const method = 'GET'

    var requestOBJ = new Object()
    if (method === 'GET') {
      requestOBJ.headers = headers
      requestOBJ.signal = controller.signal
    } else if (method === 'POST') {
      requestOBJ.method = method
      requestOBJ.body = dataForm
      requestOBJ.headers = headers
    }

    try {
      const response = await fetch(`${window.location.origin}/get-users`, requestOBJ);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data)  
      if (data) {
        displayUsersTable(data.users)
      }
    } catch (error) {
      console.error(error.message);
    }
}

function displayUsersTable(users) {
  console.log(users)
  if (users.length > 0) {
  
    let content = `
<h2 class="display-6 text-center mb-4">Compare plans</h2>
<div class="table-responsive">
  <table class="table text-center">
    <thead>
      <tr>
        <th style="width: 34%;"></th>
        <th style="width: 22%;">Name</th>
        <th style="width: 22%;">Email</th>
        <th style="width: 22%;">Role</th>
      </tr>
    </thead>
    <tbody>
`;

    for (let x in users) {
      content += `
      <tr>
        <td>${users[x].id}</td>
        <td>${users[x].name}</td>
        <td>${users[x].username}</td>
        <td>${users[x].password}</td>
      </tr>
`;
    }

    content += `
    </tbody>
  </table>
</div>
`;

    document.getElementById('main-content').innerHTML = content;


  }
}