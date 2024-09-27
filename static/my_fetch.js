

/**

*/

async function myFetch(endPoint, method, dataForm, headers) {

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
      const response = await fetch(endPoint, requestOBJ);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data)  
      if (data) {
        displayUsersTable(data.users)
        return data
      }
      return Array()
    } catch (error) {
      console.error(error.message);
      return false
    }

  }
