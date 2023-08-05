// ** Custom Components
import Avatar from '@components/avatar'
import { baseURL } from '../../../../utility/Utils'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import { X, Mail, PhoneCall, Clock, Tag, Star, Image, Trash, Slash } from 'react-feather'

const UserProfileSidebar = props => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props

  return (
    <div className={classnames('user-profile-sidebar', { show: userSidebarRight === true })}>
      <header className='user-profile-header'>
        <span className='close-icon' onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className='header-profile-sidebar'>
          <Avatar
            className='box-shadow-1 avatar-border'
            size='xl'
            status={user.status}
            img={user.avatar ? `${baseURL}/${user.avatar}` : ""}
            imgHeight='70'
            imgWidth='70'
          />
          <h4 className='chat-user-name'>{user.fullName}</h4>
          <span className='user-post'>{user.role}</span>
        </div>
      </header>
      <PerfectScrollbar className='user-profile-sidebar-area' options={{ wheelPropagation: false }}>
      
      
        <h6 className='section-label mb-1'>Delivery Details</h6>
        <p>{user.about}</p>
        <p>{user.departure_date}</p>
        <p>{user.arrival_date}</p>
        <p>{user.flight_number ?? 'Not mentioned'}</p>
        <p>{user.weight} Kg</p>
        <p>{user.price}$</p>
        <div className='personal-info'>
          <h6 className='section-label mb-1 mt-3'>Personal Information</h6>
          <ul className='list-unstyled'>
            <li className='mb-1'>
              <Mail className='me-75' size={17} />
              <span className='align-middle'>{user.user_authenticated === 1 ? "Authenticated" : "Unatuhenticated"}</span>
            </li>
          </ul>
        </div>
        <div className='more-options'>
          <h6 className='section-label mb-1 mt-3'>Options</h6>
          <ul className='list-unstyled'>
            <li className='cursor-pointer mb-1'>
              <Image className='me-50' size={17} />
              <span className='align-middle'> Go to Seller Profile</span>
            </li>
            <li className='cursor-pointer mb-1'>
              <Image className='me-50' size={17} />
              <span className='align-middle'> Go to Offer</span>
            </li>
            
            <li className='cursor-pointer'>
              <Slash className='me-75' size={17} />
              <span className='align-middle'>Block Contact</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default UserProfileSidebar
