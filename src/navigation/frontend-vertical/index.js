// ** Icons Import
import { Home,  Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

const navigationUser = [
  {
    header: 'Deals & Offers'
  },
    {
      id: 'homepage',
      title: 'Deals',
      icon: <Home />,
      children: [
        {
          id: 'baggage',
          title: 'Baggage',
          icon: <Circle size={12} />,
          navLink: '/home'
        },
        {
          id: 'hotel',
          title: 'Hotel Rooms',
          icon: <Circle size={12} />,
          navLink: '/hotels'
        },
        {
          id: 'coupon',
          title: 'Coupons',
          icon: <Circle size={12} />,
          navLink: '/coupons'
        },
      
      ]
    },
    {
      id: 'games-list',
      title: 'Games List',
      icon: <Home />,
      navLink: '/games',
    },
    {
      id: 'addNewOffer',
      title: 'Add New Deal',
      icon: <Home />,
      navLink: '/add-new-deal',
    },
    {
      id: 'MyDeals',
      title: 'My Deals',
      icon: <Home />,
      navLink: '/my-deals',
    },
   

    {
      header: 'Chats Section'
    },
    {
      id: 'Chats',
      title: 'My Chats',
      icon: <User />,
      navLink: '/my-chats',
    },
    {
      header: 'How it works'
    },
    {
      id: 'FAQ',
      title: 'FAQ',
      icon: <Home />,
      navLink: '/faq',
    },
    {
      id: 'Support',
      title: 'Contact Us',
      icon: <Home />,
      navLink: '/contact-us',
    },
    {
      header: 'Settings'
    },
    {
      id: 'Profile',
      title: 'My Profile',
      icon: <Shield />,
      navLink: '/my-profile',
    },
    {
      id: 'Notifications',
      title: 'Notifications',
      icon: <Shield />,
      navLink: '/my-notifications',
    },
    {
      id: 'Logout',
      title: 'Logout',
      icon: <Shield />,
      navLink: '/logout',
    },
  ];
  
  export default navigationUser;
  