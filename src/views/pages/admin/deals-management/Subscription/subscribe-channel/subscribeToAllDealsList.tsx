import { useEffect } from 'react';
import Echo from 'laravel-echo';
import sanctumService from '../../../../../../@core/auth/sanctum/sanctumService';

const sanctum = new sanctumService();

export const useSubscribeToAllDealsList  = (onError, onSuccess, onDataReceived) => {
  useEffect(() => {
    let cleanup;

    async function subscribeToChannel() {
      // ... the existing code for echo initialization and subscription
      const echo = new Echo({
        broadcaster: 'pusher',
        key: 'alikoza',
        cluster: 'mt1',
        encrypted: false,
        wsHost: '46.101.81.249', // e.g., 'localhost'
        wsPort: 6001, // Use the appropriate port if different
        wssPort: 6001, // Use the appropriate secure port if different
        disableStats: true,
        forceTLS: false,
        authEndpoint: `${sanctum.baseurl().replace(/\s/g, '')}/api/admin/subscribeToDealsList`,
        authorizer: (channel, options) => {
          return {
            authorize: async (socketId, callback) => {
              try {
                const response = await sanctum.subscribeToDealsList(socketId, channel.name);
                callback(false, response.data);
                
                onSuccess(response); //Add this line
              } catch (error) {
                callback(true, error);
                onError(error); // Add this line
                //console.log(response.status)
              }
            },
          };
        },
      });
      const channel = echo.private(`deals`);
      channel.listen('.App\\Events\\Admin\\DealListUpdated', (data) => {
      // console.log('Admin details updated:', data);
      onDataReceived(data); // Call the onDataReceived callback with the received data
      });

      cleanup = () => {
        //console.log('useEffect cleanup function called');
        channel.stopListening('.App\\Events\\Admin\\DealListUpdated');
        echo.disconnect();
      };
    }

    subscribeToChannel();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
};
