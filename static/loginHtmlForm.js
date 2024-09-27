
export function getLoginFormHtml() {
    
    return `
    <div class="modal-content rounded-4 shadow">

        <div class="modal-body p-5 pt-0">
          <form id="form-login">

            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="md-4" id="alert"></div>

            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" name="email" placeholder="name@example.com">
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password">
              <label for="floatingPassword">Password</label>
            </div>

            <div class="form-check text-start my-3">
              <input class="form-check-input" type="checkbox" name="remenber_me" value="remember-me"
                id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
          </form>
        </div>
      </div>
    
    `;
  }
  