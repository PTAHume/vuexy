// echoService.js
import Echo from 'laravel-echo'
import sanctumService from '../sanctum/sanctumService'
import Pusher from 'pusher-js'
const sanctum = new sanctumService()

export const echoInstance = new Echo({
    broadcaster: 'pusher',
    key: 'alikoza',
    cluster: 'mt1',
    encrypted: true,
    wsHost: 'api.dealmanager.co.uk', 
    wsPort: 6004, 
    wssPort: 6004, 
    disableStats: true,
    forceTLS: true,
    authorizer: (channel) => {
        return {
            authorize: async (socketId, callback) => {
                try {
                    // Remove "private-" prefix if it exists
                    const cleanedChannelName = channel.name.replace('private-', '')
                    const method = `subscribeToUser${cleanedChannelName.charAt(0).toUpperCase() + cleanedChannelName.slice(1)}List`
                   
                    const response = await sanctum[method](socketId, channel.name)

                    console.log(response.data, 'echo')
                    callback(false, response.data)
                } catch (error) {
                    callback(true, error)
                }
            }
        }
    }
})
