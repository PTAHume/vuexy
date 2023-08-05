import axios from "axios";

let csrfTokenPromise = null;
let csrfTokenTimeStamp = null;
let csrfTokenLifetime = 0; // Set lifetime to 1 hour

function getCsrfToken() {
  const now = new Date().getTime();
  
  // Refresh token if it's the first time or if the token has expired
  if (!csrfTokenPromise || (csrfTokenTimeStamp && ((now - csrfTokenTimeStamp) > csrfTokenLifetime * 1000))) {
    const instance = axios.create({
      interceptors: {
        request: [],
      },
    });

    csrfTokenPromise = instance.get("http://134.122.97.77/sanctum/csrf-cookie");
    csrfTokenTimeStamp = now;
  }

  return csrfTokenPromise.then((response) => {
    return response.data.csrf_token;
  });
}

export default getCsrfToken;



// import axios from "axios";

// let csrfTokenPromise = null;

// function getCsrfToken() {
//   if (!csrfTokenPromise) {
//     const instance = axios.create({
//       interceptors: {
//         request: [],
//       },
//     });

//     csrfTokenPromise = instance.get("http://localhost/sanctum/csrf-cookie");
//   }

//   return csrfTokenPromise.then((response) => {
//     return response.data.csrf_token;
//   });
// }

// export default getCsrfToken;
