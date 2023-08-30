import "@styles/react/libs/spinner/spinner.scss"
import { useSelector } from 'react-redux'
import DealEditContainer from './DealEditContainer'
import FetchDealData from './data/FetchDealData'

const EditUserDeals = () => {
  //get all data saved in redux
  const deal = useSelector((state) => state.useEditDealData)

  //loading while fetching a data
  const loading = deal?.loading
  const loadingCountries = deal?.loadingCountries
  const loadingCities = deal?.loadingCities
  const loadingAirports = deal?.loadingAirports
  const showLoader = loading || loadingCountries || loadingCities || loadingAirports
  return (
    <div>
      <FetchDealData dataVersion={deal?.version} />
      {showLoader ? (
        <div id='loading-overlay' style={{ display: 'flex' }}>
          <div className='loader'></div>
        </div>
      ) : (
        <DealEditContainer dataVersion={deal?.version} redux={deal ?? ''} />
      )}
    </div>
  )
}

export default EditUserDeals
