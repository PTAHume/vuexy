// ** Icons Import
import { Home, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "admin/",
  },
  
  {
    id: "airport-management",
    title: "Manage Airports",
    icon: <FileText size={20} />,
    navLink: 'admin/airport-management/airports'
  },
  {
    id: 'type-management',
    title: 'Manage Types',
    icon: <FileText size={20} />,
    navLink: 'admin/delivery-management/types'
    
  },

  {
    id: 'email-management',
    title: 'Manage Emails',
    icon: <FileText size={20} />,
    navLink: 'admin/email-management/emails'
    
  },
  {
    id: 'chat-management',
    title: 'Manage Chats',
    icon: <FileText size={20} />,
    navLink: 'admin/chat-management/chats'
    
  },
    
  {
    id: "admin-management",
    title: "Manage Admins",
    icon: <FileText size={20} />,
    children: [
      {
        id: 'Admins',
        title: 'Admins',
        icon: <Circle size={12} />,
        navLink: 'admin/admin-management/admins'
      },
  
     
    ]
  },
  {
    id: "deals-management",
    title: "Manage Deals",
    icon: <FileText size={20} />,
    children: [
      {
        id: 'Deals',
        title: 'Offers',
        icon: <Circle size={12} />,
        navLink: 'admin/deals-management/deals'
        
      },
    ]
  },

  {
    id: "users-management",
    title: "Manage Users",
    icon: <FileText size={20} />,
    children: [
      {
        id: 'Users',
        title: 'Users',
        icon: <Circle size={12} />,
        navLink: 'admin/user-management/users'
        
      },
    ]
  },


  

  {
    id: "general-settings",
    title: "General Settings",
    icon: <FileText size={20} />,
    children: [
      {
        id: 'Deal-settings',
        title: 'Deal Settings',
        icon: <Circle size={12} />,
        navLink: 'admin/general-settings/deals'
        
      },
      {
        id: 'Website-settings',
        title: 'Website Settings',
        icon: <Circle size={12} />,
        navLink: 'admin/general-settings/website'
        
      },
     
    ]
  },
  
]
