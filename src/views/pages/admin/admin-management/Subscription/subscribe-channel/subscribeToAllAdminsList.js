import { useEffect } from 'react'
import Echo from 'laravel-echo'
import sanctumService from '../../../../../../@core/auth/sanctum/sanctumService'

const sanctum = new sanctumService()

export const useSubscribeToAllAdminsList  = (onError, onSuccess, onDataReceived) => {
  useEffect(() => {
    let cleanup

    async function subscribeToChannel() {
      const echo = new Echo({
        broadcaster: 'pusher',
        key: 'alikoza',
        cluster: 'mt1',
        encrypted: true,
        wsHost: 'api.dealmanager.co.uk', 
        wsPort: 6004, 
        wssPort: 6004, 
        disableStats: true,
        forceTLS: true,
        authEndpoint: `${sanctum.baseurl().replace(/\s/g, '')}/api/admin/subscribeToAdminsList`,
        authorizer: (channel) => {
         
          return {
            authorize: async (socketId, callback) => {
              try {
                const response = await sanctum.subscribeToAdminsList(socketId, channel.name)
                callback(false, response.data)
                onSuccess(response)
              } catch (error) {
                callback(true, error)
                onError(error)
              
              }
            }
          }
        }
      })
      const channel = echo.private(`admins`)
      channel.listen('.App\\Events\\Admin\\AdminListUpdated', (data) => {
      onDataReceived(data) // Call the onDataReceived callback with the received data
      })

      cleanup = () => {
        channel.stopListening('.App\\Events\\Admin\\AdminListUpdated')
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
