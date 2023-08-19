// useSubscribeToChannel.js
import { useEffect } from 'react'
import { echoInstance } from './echoService'


export const useSubscribeToChannel = (channelName, onError, onSuccess, onDataReceived, args = null) => {

  useEffect(() => {
    let channel

    async function subscribe() {
      channel = echoInstance.private(channelName)
      channel.listen(`.App\\Events\\${channelName.charAt(0).toUpperCase() + channelName.slice(1)}ListUpdated`, (data) => {
        onDataReceived(data, args)
      })
    }

    subscribe()

    return () => {
      if (channel) {
        channel.stopListening(`.App\\Events\\${channelName.charAt(0).toUpperCase() + channelName.slice(1)}ListUpdated`)
        //echo.disconnect()
      }
    }
  }, [onDataReceived, args])
}