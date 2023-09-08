import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAdminDataSuccess, setLoading } from '../store/adminSlice'
import sanctumService from '@sanctum/sanctumService'
import { getHomeRouteForLoggedInUser } from '@utils'

const FetchAdminData = ({dataVersion}) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const sanctum = new sanctumService()
  const adminData = useSelector((state) => state.adminData.adminData[id])
  const keycompare = useSelector((state) => state.adminData.version)

  const fetchAdminData = useCallback(async () => {
    if (adminData && keycompare === dataVersion) {
      return
    }
    try {
      dispatch(setLoading(true))
      const response = await sanctum.getAdminData(id)
      const adminData = response.data[0]

      dispatch(fetchAdminDataSuccess(adminData))
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
    fetchAdminData()
  }, [fetchAdminData])

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'lastUpdated') {
        // Refetch the admin data when 'lastUpdated' changes in localStorage
        fetchAdminData()
      }
    }

    // Attach the event listener
    window.addEventListener('storage', handleStorageChange)

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [fetchAdminData])

  return null
}

export default FetchAdminData
