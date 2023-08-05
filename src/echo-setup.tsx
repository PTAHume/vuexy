// // echoInstance.js
// import Echo from "laravel-echo";
// import Socketio from "socket.io-client";

// const echoInstance = new Echo({
//   broadcaster: "socket.io",
//   host: import.meta.env.VITE_PUSHER_HOST + ':' + import.meta.env.VITE_PUSHER_PORT,
//   client: Socketio,
//   forceTLS: false,
//   // key: 'your_own_pusher_app_key', 
//   // wsPort: 6001,
//   // wssPort: 6001,
//   // wsTransports: ['websocket'], // Use only WebSocket as the transport method
// });

// export default echoInstance;


// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// const echoInstance = new Echo({
//   broadcaster: 'pusher',
//   key: 'your_local_key', // This can be any random string, as it's not used with a local server
//   wsHost: window.location.hostname,
//   wsPort: 6001,
//   wssPort: 6001, // If you're using SSL, otherwise, you can remove this line
//   forceTLS: false, // Set to true if you're using SSL
//   disableStats: true,
//   enabledTransports: ['ws', 'wss'], // Add 'wss' if you're using SSL
//   pusher: {
//     authorizer: (channel, options) => {
//       return {
//         authorize: (socketId, callback) => {
//           // Use an empty authorization object for a local server
//           callback(false, {});
//         },
//       };
//     },
//   },
// });

// export default echoInstance;



// import Pusher from 'pusher-js';

// const echoInstance = new Pusher('your_own_pusher_app_key', {
//   cluster: 'mt_1',
//   encrypted: false,
//   wsHost: '127.0.0.1', // e.g., 'localhost'
//   wsPort: 6001, // Use the appropriate port if different
//   wssPort: 6001, // Use the appropriate secure port if different
//   disableStats: true,
//   enabledTransports: ['ws', 'wss'],
// });

// export default echoInstance;