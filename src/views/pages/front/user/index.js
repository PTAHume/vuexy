import "@styles/react/libs/spinner/spinner.scss"
import { useSelector } from 'react-redux'
import UserEditContainer from './UserEditContainer'
import FetchUserData from './data/FetchUserData'

const EditUser = () => {
  const user = useSelector((state) => state.userProfile)

  //loading while fetching a data
  const loading = user.loading

  return (
    <div>
      <FetchUserData dataVersion={user.version} redux={user} />
      {loading ? (
        <div id='loading-overlay' style={{ display: 'flex' }}>
          <div className='loader'></div>
        </div>
      ) : (
        <UserEditContainer dataVersion={user.version} redux={user} />
      )}
    </div>
  )
}

export default EditUser
