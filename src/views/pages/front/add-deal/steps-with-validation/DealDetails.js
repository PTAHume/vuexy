import { Fragment, useState, useEffect } from 'react'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import AutoComplete from "@components/autocomplete"
import {  Card, CardBody, Form, Label, Row, Col, Button } from 'reactstrap'
import useGetSuggestionsByFilterKey from "../hooks/useGetSuggestionsbyFilterKey"
import useDebouncedFetchCountries from "../hooks/debouncedFetchCountries"


import {
  setDepartureCountry,
  setArrivalCountry,
  setDepartureCity,
  setArrivalCity,
  setDepartureAirport,
  setArrivalAirport,
  setDepartureCountryId,
  setDepartureAirportId,
  setDepartureCityId,
  setArrivalCountryId,
  setArrivalCityId,
  setArrivalAirportId
} from "../store"


const DealDetails = ({ stepper }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()

  const { filterKey, setFilterKey, getSuggestionsByFilterKey } =
  useGetSuggestionsByFilterKey(suggestions)

  const SignupSchema = yup.object().shape({
    departure_country: yup.string().required('Departure Country is required'),
    departure_city: yup.string().required('Departure City is required'),
    departure_airport: yup.string().required('Departure Airport is required'),
    arrival_country: yup.string().required('Arrival Country is required'),
    arrival_city: yup.string().required('Arrival City is required'),
    arrival_airport: yup.string().required('Arrival Airport is required')
  })
  
  
  const { control, reset, setValue, setError, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  })
  

  {
    /*Ok lets get the redux variables for country,city and airorts */
  }
  const departure_country_id = useSelector(
    (state) => state.ecommerce?.departure_country_id
  )
  const departure_city_id = useSelector(
    (state) => state.ecommerce?.departure_city_id
  )
  const arrival_country_id = useSelector(
    (state) => state.ecommerce?.arrival_country_id
  )
  const arrival_city_id = useSelector(
    (state) => state.ecommerce?.arrival_city_id
  )
  const departure_airport_id = useSelector(
    (state) => state.ecommerce?.departure_airport_id
  )
  const arrival_airport_id = useSelector(
    (state) => state.ecommerce?.departure_airport_id
  )


  const { debouncedFetchCountries } = useDebouncedFetchCountries(
    searchQuery,
    filterKey,
    departure_country_id,
    departure_city_id,
    arrival_country_id,
    arrival_city_id,
    departure_airport_id,
    arrival_airport_id,
    setSuggestions,
    setIsLoading,
    setErrorMessage
  )


useEffect(() => {
    if (searchQuery === "") {
      setSuggestions([])
      setIsLoading(false)
    } else {
      setIsLoading(true)
      debouncedFetchCountries(searchQuery, filterKey)
    }
  }, [searchQuery, filterKey, debouncedFetchCountries])


  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Deal Details</h5>
        <small className="text-muted">Enter Your Deal Details.</small>
      </div>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
         <Row>
         <Col md='6' className='mb-1'>
            {/* Country */}
            <Label for="departure_country">Departure Country</Label>
            <Controller
              control={control}
              name="departure_country"
              // defaultValue={reduxStore?.departureCountry}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading} // Change this line
                  suggestions={getSuggestionsByFilterKey("departureCountry")}
                  className="form-control"
                  errorMessage={errorMessage}
                  filterKey="nicename"
                  suggestionLimit={5}
                  placeholder="Type a country name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setDepartureCountryId(suggestion.id)) // Update the Redux store with the selected country ID
                    dispatch(setDepartureCountry(suggestion.nicename))
                  }}
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    //setDepartureCountryInput(event.target.value)

                    if (event.target.value === "") {
                      field.onChange("") // Update the field value if the input is empty
                      dispatch(setDepartureCountryId(null))
                    } else {
                      // Check if the typed value matches any of the available suggestions
                      const matchedSuggestion = getSuggestionsByFilterKey(
                        "departureCountry"
                      ).find(
                        (suggestion) =>
                          suggestion.nicename.toLowerCase() ===
                          event.target.value.toLowerCase()
                      )

                      if (matchedSuggestion) {
                        field.onChange(matchedSuggestion.id)
                        dispatch(setDepartureCountryId(matchedSuggestion.id))
                      } else {
                        // Clear the previously selected value if the typed value doesn't match any suggestions
                        field.onChange("")
                        dispatch(setDepartureCountryId(null))
                      }
                    }
                    setFilterKey("departureCountry")
                    setErrorMessage("") // Clear the error message
                  }}
                  autoComplete="off"
                />
              )}
            />
            {errors.departure_country && (
              <div className="text-danger">
                {errors.departure_country.message}
              </div>
            )}
            </Col>
            <br />
            <Col md='6' className='mb-1'>
                {/*arrival Country */}
            <Label for="arrival_country">Arrival Country</Label>
            <Controller
              control={control}
              name="arrival_country"
              // defaultValue={reduxStore?.arrivalCountry}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading} // Change this line
                  suggestions={getSuggestionsByFilterKey("arrivalCountry")}
                  className="form-control"
                  errorMessage={errorMessage}
                  filterKey="nicename"
                  suggestionLimit={5}
                  placeholder="Type a country name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setArrivalCountryId(suggestion.id)) // Update the Redux store with the selected country ID
                    dispatch(setArrivalCountry(suggestion.nicename))
                  }}
                  onChange={(event) => {
                  //  setArrivalCountryInput(event.target.value)
                    setSearchQuery(event.target.value)
                    if (event.target.value === "") {
                      field.onChange("") // Update the field value if the input is empty
                      dispatch(setArrivalCountryId(null))
                    } else {
                      // Check if the typed value matches any of the available suggestions
                      const matchedSuggestion = getSuggestionsByFilterKey(
                        "arrivalCountry"
                      ).find(
                        (suggestion) =>
                          suggestion.nicename.toLowerCase() ===
                          event.target.value.toLowerCase()
                      )

                      if (matchedSuggestion) {
                        field.onChange(matchedSuggestion.id)
                        dispatch(setArrivalCountryId(matchedSuggestion.id))
                      } else {
                        // Clear the previously selected value if the typed value doesn't match any suggestions
                        field.onChange("")
                        dispatch(setArrivalCountryId(null))
                      }
                    }

                    setFilterKey("arrivalCountry")
                    setErrorMessage("") // Clear the error message
                  }}
                  autocomplete="off" // Add this lin
                />
              )}
            />
            <br />
            {errors.arrival_country && (
              <div className="text-danger">
                {errors.arrival_country.message}
              </div>
            )}
            </Col>
            </Row>
            
            <Row>
            <Col md='6' className='mb-1'>
            {/* City */}
            <Label for="departure_city">Departure City</Label>
            <Controller
              control={control}
              name="departure_city"
              // defaultValue={reduxStore?.departureCity}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading}
                  suggestions={getSuggestionsByFilterKey("departureCity")}
                  className="form-control"
                  filterKey="name"
                  suggestionLimit={5}
                  placeholder="Type a city name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setDepartureCityId(suggestion.id)) // Update the Redux store with the selected city ID
                    dispatch(setDepartureCity(suggestion.name))
                  }}
                  onChange={(event) => {
                    //setDepartureCityInput(event.target.value)
                    setSearchQuery(event.target.value)
                    if (event.target.value === "") {
                      field.onChange("") // Update the field value if the input is empty
                      dispatch(setDepartureCityId(null))
                    } else {
                      // Check if the typed value matches any of the available suggestions
                      const matchedSuggestion = getSuggestionsByFilterKey(
                        "departureCity"
                      ).find(
                        (suggestion) =>
                          suggestion.name.toLowerCase() ===
                          event.target.value.toLowerCase()
                      )

                      if (matchedSuggestion) {
                        field.onChange(matchedSuggestion.id)
                        dispatch(setDepartureCityId(matchedSuggestion.id))
                      } else {
                        // Clear the previously selected value if the typed value doesn't match any suggestions
                        field.onChange("")
                        dispatch(setDepartureCityId(null))
                      }
                    }

                    setFilterKey("departureCity")
                    setErrorMessage("") // Clear the error message
                  }}
                  autocomplete="off" // Add this lin
                />
              )}
            />
            {errors.departure_city && (
              <div className="text-danger">{errors.departure_city.message}</div>
            )}
            </Col>
            <br />

            <Col md='6' className='mb-1'>
               {/* City */}
            <Label for="arrival_city">Arrival City</Label>
            <Controller
              control={control}
              name="arrival_city"
              // defaultValue={reduxStore?.arrivalCity}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading}
                  suggestions={getSuggestionsByFilterKey("arrivalCity")}
                  className="form-control"
                  filterKey="name"
                  suggestionLimit={5}
                  placeholder="Type a city name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setArrivalCityId(suggestion.id))
                    dispatch(setArrivalCity(suggestion.name))
                  }}
                  onChange={(event) => {
                  //  setArrivalCityInput(event.target.value)
                    setSearchQuery(event.target.value)
                    if (event.target.value === "") {
                      field.onChange("") // Update the field value if the input is empty
                      dispatch(setArrivalCityId(null))
                    } else {
                      // Check if the typed value matches any of the available suggestions
                      const matchedSuggestion = getSuggestionsByFilterKey(
                        "arrivalCity"
                      ).find(
                        (suggestion) =>
                          suggestion.name.toLowerCase() ===
                          event.target.value.toLowerCase()
                      )

                      if (matchedSuggestion) {
                        field.onChange(matchedSuggestion.id)
                        dispatch(setArrivalCityId(matchedSuggestion.id))
                      } else {
                        // Clear the previously selected value if the typed value doesn't match any suggestions
                        field.onChange("")
                        dispatch(setArrivalCityId(null))
                      }
                    }

                    setFilterKey("arrivalCity")
                    setErrorMessage("") // Clear the error message
                  }}
                  autocomplete="off" // Add this lin
                />
              )}
            />
            {errors.arrival_city && (
              <div className="text-danger">{errors.arrival_city.message}</div>
            )}
            <br />
            </Col></Row>

              <Row>
                <Col md='6' className='mb-1'>
            {/* departure airport */}
            <Label for="departure_airport">Departure Airport</Label>
            <Controller
              control={control}
              name="departure_airport"
              // defaultValue={reduxStore?.departureAirport}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading}
                  suggestions={getSuggestionsByFilterKey("departureAirports")}
                  className="form-control"
                  filterKey="airport_name"
                  suggestionLimit={5}
                  placeholder="Type a airport name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setDepartureAirportId(suggestion.id)) // Update the Redux store with the selected airport ID
                    dispatch(setDepartureAirport(suggestion.airport_name))
                  }}
                  onChange={(event) => {
                  //  setDepartureAirportInput(event.target.value)
                    setSearchQuery(event.target.value)
                    if (event.target.value === "") {
                      field.onChange("") // Update the field value if the input is empty
                      dispatch(setDepartureAirportId(null))
                    } else {
                      // Check if the typed value matches any of the available suggestions
                      const matchedSuggestion = getSuggestionsByFilterKey(
                        "departureAirports"
                      ).find(
                        (suggestion) =>
                          suggestion.airport_name.toLowerCase() ===
                          event.target.value.toLowerCase()
                      )

                      if (matchedSuggestion) {
                        field.onChange(matchedSuggestion.id)
                        dispatch(setDepartureAirportId(matchedSuggestion.id))
                      } else {
                        // Clear the previously selected value if the typed value doesn't match any suggestions
                        field.onChange("")
                        dispatch(setDepartureAirportId(null))
                      }
                    }

                    setFilterKey("departureAirports")
                    setErrorMessage("") // Clear the error message
                  }}
                  autocomplete="off" // Add this lin
                />
              )}
            />
            {errors.departure_airport && (
              <div className="text-danger">
                {errors.departure_airport.message}
              </div>
            )}
            <br />
              </Col>
          
           
<Col md='6' className='mb-1'>
            {/* Arrival airport */}
            <Label for="arrival_airport">Arrival Airport</Label>
            <Controller
              control={control}
              name="arrival_airport"
              // defaultValue={reduxStore?.arrivalAirport}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  loading={isLoading}
                  suggestions={getSuggestionsByFilterKey("arrivalAirports")}
                  className="form-control"
                  filterKey="airport_name"
                  suggestionLimit={5}
                  placeholder="Type a airport name..."
                  onSelectSuggestion={(suggestion) => {
                    field.onChange(suggestion.id)
                    dispatch(setArrivalAirportId(suggestion.id)) // Update the Redux store with the selected airport ID
                    dispatch(setArrivalAirport(suggestion.airport_name))
                   // setArrivalAirportInput(suggestion.airport_name) // Add this line
                  }}
                  onChange={(event) => {
                    // setArrivalAirportInput(event.target.value)
                    setSearchQuery(event.target.value)
                    const matchedSuggestion = getSuggestionsByFilterKey(
                      "arrivalAirports"
                    ).find(
                      (suggestion) =>
                        suggestion.airport_name.toLowerCase() ===
                        event.target.value.toLowerCase()
                    )

                    if (matchedSuggestion) {
                      field.onChange(matchedSuggestion.id)
                      dispatch(setArrivalAirportId(matchedSuggestion.id))
                    } else {
                      field.onChange("")
                      dispatch(setArrivalAirportId(null))
                    }

                    setFilterKey("arrivalAirports")
                    setErrorMessage("") // Clear the error message
                  }}
                  autocomplete="off" // Add this lin
                />
              )}
            />
            {errors.arrival_airport && (
              <div className="text-danger">
                {errors.arrival_airport.message}
              </div>
            )}
            </Col></Row>


        <br />
        <div className="d-flex justify-content-between">
        <Button
          type="button"
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button type="submit" color="primary" className="btn-next" disabled={!isObjEmpty(errors)}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
          </Form>
        </CardBody>
      </Card>
    
    </Fragment>
  )
}

export default DealDetails
