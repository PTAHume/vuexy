import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDealDataSuccess, setLoadingDeal, setReduxCountries, setReduxCities, setReduxAirports } from '../store'
import sanctumService from '../../../../../@core/auth/sanctum/sanctumService'
import { getHomeRouteForLoggedInUser } from '@utils'

const FetchDealData = ({ dataVersion }) => {
  const sanctum = useMemo(() => new sanctumService(), [])
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const dealData = useSelector((state) => state.useEditDealData?.dealData[id])
  const keycompare = useSelector((state) => state.useEditDealData?.version)
  const countries = useSelector((state) => state.useEditDealData?.countries)
  const cities = useSelector((state) => state.useEditDealData?.cities)
  const airports = useSelector((state) => state.useEditDealData?.airports)

  // Add a new state to track if dependent data has been fetched
  const [fetchedDependentData, setFetchedDependentData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {

      // Check if dealData is already available in Redux
      if (!(dealData && keycompare === dataVersion)) {
        try {
          dispatch(setLoadingDeal(true))
          // Get deal data
          const response = await sanctum.getUserDealData(id)
          const dealData = response.data
          dispatch(fetchDealDataSuccess(dealData))
        } catch (error) {
          console.error('Error fetching deal data:', error)
          if (error.response.status === 404) {
            navigate(getHomeRouteForLoggedInUser())
          }
        } finally {
          dispatch(setLoadingDeal(false))
        }
      }
    }

    fetchData()
  }, [id, dispatch, dataVersion, dealData, keycompare, navigate, sanctum])

  useEffect(() => {
    const fetchDependentData = async () => {

      // Fetch countries, airports, and cities if not available in Redux and not fetched yet
      if (!fetchedDependentData && (!countries.length || !cities.length || !airports.length)) {
        try {
          const allDataResponse = await sanctum.getAllUserData()

          if (allDataResponse) {
            if (!countries.length) {
              dispatch(setReduxCountries(allDataResponse.data.countries))
            }

            if (!cities.length) {
              dispatch(setReduxCities(allDataResponse.data.cities))
            }

            if (!airports.length) {
              dispatch(setReduxAirports(allDataResponse.data.airports))
            }

            // Set fetchedDependentData to true after fetching data
            setFetchedDependentData(true)
          }
        } catch (error) {
          console.error('Error fetching countries, cities, or airports:', error)
        }
      }
    }

    fetchDependentData()
  }, [countries.length, cities.length, airports.length, fetchedDependentData, dispatch, sanctum])

  return null
}

export default FetchDealData
