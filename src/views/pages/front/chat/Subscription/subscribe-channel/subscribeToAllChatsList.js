import { useEffect } from 'react'
import Echo from 'laravel-echo'
import sanctumService from '../../../../../../@core/auth/sanctum/sanctumService'

const sanctum = new sanctumService()

export const useSubscribeToAllChatsList  = (onError, onSuccess, onDataReceived) => {
  useEffect(() => {
    let cleanup

    async function subscribeToChannel() {
      // ... the existing code for echo initialization and subscription
      const echo = new Echo({
        broadcaster: 'pusher',
        key: 'alikoza',
        cluster: 'mt1',
        encrypted: false,
        wsHost: 'api.dealmanager.co.uk', 
        wsPort: 6004,
        wssPort: 6004, 
        disableStats: true,
        forceTLS: false,
        authEndpoint: `${sanctum.baseurl().replace(/\s/g, '')}/api/front/subscribeToChat`,
        authorizer: (channel) => {
          return {
            authorize: async (socketId, callback) => {
              try {
                const response = await sanctum.subscribeToChat(socketId, channel.name)
                callback(false, response.data)
                onSuccess(response) //Add this line
              } catch (error) {
                callback(true, error)
                onError(error) // Add this line
              }
            }
          }
        }
      })
      const channel = echo.private(`chats`)
      channel.listen('.App\\Events\\Chat\\ChatListUpdated', (data) => {
          onDataReceived(data) // Call the onDataReceived callback with the received data
      })

      cleanup = () => {
        channel.stopListening('.App\\Events\\Chat\\ChatListUpdated')
        echo.disconnect()
      }
    }

    subscribeToChannel()

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [])
}
