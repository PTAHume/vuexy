// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const AppChat = lazy(() => import('../../../views/pages/front/chat/'))


const MyChats = [
  {
    element: <AppChat />,
    path: '/my-chats/:id?',
    meta: {
      appLayout: true,
      className: 'chat-application',
      privateRoute: "true"
    }
  }

]

export default MyChats
