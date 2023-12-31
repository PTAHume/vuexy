import axios from "axios"

let csrfTokenPromise = null
let csrfTokenTimeStamp = null
let csrfTokenLifetime = 0 // Set lifetime to 1 hour

function getCsrfToken() {
  const now = new Date().getTime()

  // Refresh token if it's the first time or if the token has expired
  if (!csrfTokenPromise || (csrfTokenTimeStamp && ((now - csrfTokenTimeStamp) > csrfTokenLifetime * 1000))) {
    const instance = axios.create({
      interceptors: {
        request: []
      }
    })

    csrfTokenPromise = instance.get("https://api.dealmanager.co.uk/sanctum/csrf-cookie")
    csrfTokenTimeStamp = now
  }

  return csrfTokenPromise.then((response) => {
    return response.data.csrf_token
  })
}

export default getCsrfToken