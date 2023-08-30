import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchuserDataSuccess, setLoading } from '../store/userSlice'
import sanctumService from '../../../../../@core/auth/sanctum/sanctumService'
import { getHomeRouteForLoggedInUser } from '@utils'

const FetchUserData = ({dataVersion}) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const sanctum = new sanctumService()
  const userData = useSelector((state) => state.userData.userData[id])
  const keycompare = useSelector((state) => state.userData.version)

  const fetchuserData = useCallback(async () => {
    if (userData && keycompare === dataVersion) {
      return
    }
    try {
      dispatch(setLoading(true))
      const response = await sanctum.getuserData(id)
      const userData = response.data[0]

      dispatch(fetchuserDataSuccess(userData))
      dispatch(setLoading(false))
    } catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        navigate(getHomeRouteForLoggedInUser())
      } else {
        console.log('Error', error.message)
      }
      dispatch(setLoading(false))
    }
  }, [id, dispatch])

  useEffect(() => {
    fetchuserData()
  }, [fetchuserData])

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'lastUpdated') {
        // Refetch the admin data when 'lastUpdated' changes in localStorage
        fetchuserData()
      }
    }

    // Attach the event listener
    window.addEventListener('storage', handleStorageChange)

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [fetchuserData])

  return null
}

export default FetchUserData
