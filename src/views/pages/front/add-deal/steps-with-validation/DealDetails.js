import { Fragment, useState, useEffect } from 'react'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import AutoComplete from "@components/autocomplete"
import { Card, CardBody, Form, Label, Row, Col, Button } from 'reactstrap'
import useGetSuggestionsByFilterKey from "../../hooks/useGetSuggestionsbyFilterKey"
import useDebouncedFetchCountries from "../../hooks/debouncedFetchCountries"
import moment from "moment"
import Flatpickr from "react-flatpickr"
//import rangePlugin from 'flatpickr/dist/plugins/rangePlugin'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import "flatpickr/dist/themes/dark.css"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import '@styles/customSelectValidation.scss'
import {
  setDepartureDate,
  setArrivalDate,
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
  const [enableDepartureCity, setEnableDepartureCity] = useState(false)
  const [enableDepartureAirport, setEnableDepartureAirport] = useState(false)
  const [enableArrivalCity, setEnableArrivalCity] = useState(false)
  const [enableArrivalAirport, setEnableArrivalAirport] = useState(false)

  const dispatch = useDispatch()

  const { filterKey, setFilterKey, getSuggestionsByFilterKey } =
    useGetSuggestionsByFilterKey(suggestions)

  const dateValidation = (arrivalDate, departureDate) => {
    if (arrivalDate && departureDate) {
      return moment(departureDate).isSameOrAfter(arrivalDate)
    }
    return true
  }

  const SignupSchema = yup.object().shape({
    departure_country: yup.string().required('Departure Country is required'),
    departure_city: yup.string().required('Departure City is required'),
    departure_airport: yup.string().required('Departure Airport is required')
      .test('departure-airport-required', 'Departure Airport is required', function (value) {
        return value?.length > 0 &&  departure_airport?.value.length > 0 
    }),
    arrival_country: yup.string().required('Arrival Country is required'),
    arrival_city: yup.string().required('Arrival City is required'),
    arrival_airport: yup.string().required('Arrival Airport is required')
      .test('arrival-airport-required', 'Arrival Airport is required', function (value) {
        return value?.length > 0 && arrival_airport?.value.length > 0
      }),
    departure_date: yup.date()
      .required("Departure Date Time is required")
      .transform((value, originalValue) => {
        return originalValue ? moment(originalValue).toDate() : value
      }).typeError("Departure Date Time is required")
      .min(new Date(), "Start Date must be later than today"),
    arrival_date: yup.date()
      .required("Arrival Date Time is required")
      .transform((value, originalValue) => {
        return originalValue ? moment(originalValue).toDate() : value
      })
      .test('departure-after-arrival', 'End date must be after start date', function (value) {
        const arrivalDate = this.parent.departure_date
        return dateValidation(arrivalDate, value)
      })
  })

  const [showArrivalAirportWarning, setShowArrivalAirportWarning] = useState(false)
  const [showDepartureAirportWarning, setShowDepartureAirportWarning] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema),
    shouldFocusError: false
  })
  const departure_country_id = useSelector(
    (state) => state.useDealData?.departure_country_id
  )
  const departure_city_id = useSelector(
    (state) => state.useDealData?.departure_city_id
  )
  const arrival_country_id = useSelector(
    (state) => state.useDealData?.arrival_country_id
  )
  const arrival_city_id = useSelector(
    (state) => state.useDealData?.arrival_city_id
  )
  const departure_airport_id = useSelector(
    (state) => state.useDealData?.departure_airport_id
  )
  const arrival_airport_id = useSelector(
    (state) => state.useDealData?.departure_airport_id
  )
  const departureDate = useSelector(
    (state) => {
      return state.useDealData?.departureDate ?? ""
    }
  )
  const arrivalDate = useSelector(
    (state) => {
      return state.useDealData?.arrivalDate ?? ""
    }
  )
  const departureCity = useSelector(
    (state) => {
      return state.useDealData?.departureCity ?? ""
    }
  )
  const departureAirport = useSelector(
    (state) => {
      return state.useDealData?.departureAirport ?? ""
    }
  )
  const arrivalCity = useSelector(
    (state) => {
      return state.useDealData?.arrivalCity ?? ""
    }
  )
  const arrivalAirport = useSelector(
    (state) => {
      return state.useDealData?.arrivalAirport ?? ""
    }
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
                {/* Departure Date */}
                <Label className="form-label" for="departure_date">
                  Departure Date
                </Label>
                <div className="date-input-group">
                  <Controller
                    control={control}
                    id="departure_dateAsync"
                    name="departure_date"
                    render={({ field }) => {
                      return (
                        <div>
                          <Flatpickr
                            {...field}
                            value={field.value || departureDate || ""}
                            data-enable-time
                            placeholder='Departure Date & Time'
                            id="departure-picker"
                            options={{
                              dateFormat: "Y-m-d H:i",
                              enableTime: true,
                              plugins: [new confirmDatePlugin({})]
                            }}
                            className={`form-control ${errors.departure_date ? "is-invalid" : ""
                              }`}
                            onChange={(dateObj, dateString) => {
                              dispatch(setDepartureDate(dateString))
                              field.onChange(dateString)
                            }}
                          />

                        </div>
                      )
                    }}
                    autocomplete="off" // Add this lin
                  />

                  {errors.departure_date && (
                    <div className="text-danger">
                      {errors.departure_date.message}
                    </div>
                  )}
                </div>
                <br />
              </Col>
              <Col md='6' className='mb-1'>
                {/* Arrival Date */}
                <Label className="form-label" for="arrival_date">
                  Arrival Date
                </Label>
                <div className="date-input-group">
                  <Controller
                    control={control}
                    id="arrival_dateAsync"
                    name="arrival_date"
                    render={({ field }) => {
                      return (
                        <div>
                          <Flatpickr
                            {...field}
                            value={field.value || arrivalDate || ""}
                            data-enable-time
                            id="arrival-picker"
                            placeholder='Arrival Date & Time'
                            options={{
                              dateFormat: "Y-m-d H:i",
                              enableTime: true,
                              plugins: [new confirmDatePlugin({})]
                            }}
                            className={`form-control ${errors.arrival_date ? "is-invalid" : ""
                              }`}
                            onChange={(dateObj, dateString) => {
                              dispatch(setArrivalDate(dateString))
                              field.onChange(dateString)
                            }}
                          />
                        </div>
                      )
                    }}
                    autocomplete="off" // Add this
                  />
                  {errors.arrival_date && (
                    <div className="text-danger">
                      {errors.arrival_date.message}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
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
                      id="departure_country"
                      autocomplete="off"
                      placeholder="Type a country name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id)
                        dispatch(setDepartureCountryId(suggestion.id)) // Update the Redux store with the selected country ID
                        dispatch(setDepartureCountry(suggestion.nicename))
                        setEnableDepartureCity(true)
                      }}
                      onChange={(event) => {
                        setSearchQuery(event.target.value)
                        //setDepartureCountryInput(event.target.value)

                        if (event.target.value === "") {
                          field.onChange("") // Update the field value if the input is empty                     
                          dispatch(setDepartureCountryId(null))
                          dispatch(setDepartureCity(''))
                          dispatch(setDepartureCityId(0))
                          setEnableDepartureCity(false)
                          dispatch(setDepartureAirport(''))
                          dispatch(setDepartureAirportId(0))
                          setEnableDepartureAirport(false)
                        } else {

                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureCountry"
                          ).find(
                            (suggestion) => suggestion.nicename.toLowerCase() ===
                              event.target.value.toLowerCase()
                          )

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id)
                            dispatch(setDepartureCountryId(matchedSuggestion.id))
                            setEnableDepartureCity(true)
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("")
                            dispatch(setDepartureCountryId(null))
                            dispatch(setDepartureCity(''))
                            dispatch(setDepartureCityId(0))
                            setEnableDepartureCity(false)
                            dispatch(setDepartureAirport(''))
                            dispatch(setDepartureAirportId(0))
                            setEnableDepartureAirport(false)
                          }
                        }
                        setFilterKey("departureCountry")
                        setErrorMessage("") // Clear the error message
                      }}
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
                      id="arrival_country"
                      autocomplete="off"
                      placeholder="Type a country name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id)
                        dispatch(setArrivalCountryId(suggestion.id)) // Update the Redux store with the selected country ID
                        dispatch(setArrivalCountry(suggestion.nicename))
                        setEnableArrivalCity(true)
                      }}
                      onChange={(event) => {
                        //  setArrivalCountryInput(event.target.value)
                        setSearchQuery(event.target.value)
                        if (event.target.value === "") {
                          field.onChange("") // Update the field value if the input is empty
                          dispatch(setArrivalCountryId(null))
                          dispatch(setArrivalCity(''))
                          dispatch(setArrivalCityId(0))
                          setEnableArrivalCity(false)
                          dispatch(setArrivalAirport(''))
                          dispatch(setArrivalAirportId(0))
                          setEnableArrivalAirport(false)
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "arrivalCountry"
                          ).find(
                            (suggestion) => suggestion.nicename.toLowerCase() ===
                              event.target.value.toLowerCase()
                          )

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id)
                            dispatch(setArrivalCountryId(matchedSuggestion.id))
                            setEnableArrivalCity(true)
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("")
                            dispatch(setArrivalCountryId(null))
                            dispatch(setArrivalCity(''))
                            dispatch(setArrivalCityId(0))
                            setEnableArrivalCity(false)
                            dispatch(setArrivalAirport(''))
                            dispatch(setArrivalAirportId(0))
                            setEnableArrivalAirport(false)
                          }
                        }

                        setFilterKey("arrivalCountry")
                        setErrorMessage("") // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.arrival_country && (
                  <div className="text-danger">
                    {errors.arrival_country.message}
                  </div>
                )}
                <br />
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
                      id="departure_city"
                      autocomplete="off"
                      disabled={!enableDepartureCity}
                      value={departureCity}
                      placeholder="Type a city name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id)
                        dispatch(setDepartureCityId(suggestion.id)) // Update the Redux store with the selected city ID
                        dispatch(setDepartureCity(suggestion.name))
                        setEnableDepartureAirport(true)
                      }}
                      onChange={(event) => {
                        //setDepartureCityInput(event.target.value)
                        setSearchQuery(event.target.value)
                        if (event.target.value === "") {
                          field.onChange("") // Update the field value if the input is empty
                          dispatch(setDepartureCityId(null))
                          dispatch(setDepartureAirport(''))
                          dispatch(setDepartureAirportId(0))
                          setEnableDepartureAirport(false)
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureCity"
                          ).find(
                            (suggestion) => suggestion.name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          )

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id)
                            dispatch(setDepartureCityId(matchedSuggestion.id))
                            setEnableDepartureAirport(true)
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("")
                            dispatch(setDepartureCityId(null))
                            dispatch(setDepartureAirport(''))
                            dispatch(setDepartureAirportId(0))
                            setEnableDepartureAirport(false)
                          }
                        }

                        setFilterKey("departureCity")
                        setErrorMessage("") // Clear the error message
                      }}

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
                      id="arrival_city"
                      value={arrivalCity}
                      autocomplete="off"
                      disabled={!enableArrivalCity}
                      placeholder="Type a city name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id)
                        dispatch(setArrivalCityId(suggestion.id))
                        dispatch(setArrivalCity(suggestion.name))
                        setEnableArrivalAirport(true)
                      }}
                      onChange={(event) => {
                        //  setArrivalCityInput(event.target.value)
                        setSearchQuery(event.target.value)
                        if (event.target.value === "") {
                          field.onChange("") // Update the field value if the input is empty
                          dispatch(setArrivalCityId(null))
                          dispatch(setArrivalAirport(''))
                          dispatch(setArrivalAirportId(0))
                          setEnableArrivalAirport(false)
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "arrivalCity"
                          ).find(
                            (suggestion) => suggestion.name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          )

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id)
                            dispatch(setArrivalCityId(matchedSuggestion.id))
                            setEnableArrivalAirport(true)
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("")
                            dispatch(setArrivalCityId(null))
                            dispatch(setArrivalAirport(''))
                            dispatch(setArrivalAirportId(0))
                            setEnableArrivalAirport(false)
                          }
                        }

                        setFilterKey("arrivalCity")
                        setErrorMessage("") // Clear the error message
                      }}
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
                  id="departure_airport"
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
                      id="departure_airport"
                      autocomplete="off"
                      disabled={!enableDepartureAirport}
                      value={departureAirport}
                      placeholder="Type a airport name..."
                      onSelectSuggestion={(suggestion) => {
                        setShowDepartureAirportWarning(false)
                        setShowArrivalAirportWarning(false)
                        field.onChange(suggestion.id)
                        dispatch(setDepartureAirportId(suggestion.id)) // Update the Redux store with the selected airport ID
                        dispatch(setDepartureAirport(suggestion.airport_name))
                        if (arrival_airport?.value === suggestion.airport_name) {
                          dispatch(setArrivalAirport(''))
                          dispatch(setArrivalAirportId(0))
                          setShowDepartureAirportWarning(true)
                          arrival_airport.value = ''
                        }
                      }}
                      onChange={(event) => {
                        setShowDepartureAirportWarning(false)
                        setShowArrivalAirportWarning(false)
                        setSearchQuery(event.target.value)
                        if (event.target.value === "") {
                          field.onChange("") // Update the field value if the input is empty
                          dispatch(setDepartureAirportId(null))
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureAirports"
                          ).find(
                            (suggestion) => suggestion.airport_name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          )

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id)
                            dispatch(setDepartureAirportId(matchedSuggestion.id))
                            if (arrival_airport?.value === matchedSuggestion.airport_name) {
                              dispatch(setArrivalAirport(''))
                              dispatch(setArrivalAirportId(0))
                              setShowDepartureAirportWarning(true)
                              arrival_airport.value = ''
                            }
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("")
                            dispatch(setDepartureAirportId(null))
                          }
                        }

                        setFilterKey("departureAirports")
                        setErrorMessage("") // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.departure_airport && (
                  <div className="text-danger">
                    {errors.departure_airport.message}
                  </div>
                )}
                {showDepartureAirportWarning && (
                  <div class="text-danger">Departure Airport can not be the same as the Arrival Airport </div>
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
                      id="arrival_airport"
                      value={arrivalAirport}
                      autocomplete="off"
                      disabled={!enableArrivalAirport}
                      placeholder="Type a airport name..."
                      onSelectSuggestion={(suggestion) => {
                        setShowDepartureAirportWarning(false)
                        setShowArrivalAirportWarning(false)
                        field.onChange(suggestion.id)
                        dispatch(setArrivalAirportId(suggestion.id)) // Update the Redux store with the selected airport ID
                        dispatch(setArrivalAirport(suggestion.airport_name))

                        if (departure_airport?.value === suggestion.airport_name) {
                          setShowArrivalAirportWarning(true)
                          dispatch(setDepartureAirport(''))
                          dispatch(setDepartureAirportId(0))  
                          departure_airport.value = ''
                        } 

                      }}
                      onChange={(event) => {
                        setShowDepartureAirportWarning(false)
                        setShowArrivalAirportWarning(false)

                        setSearchQuery(event.target.value)
                        const matchedSuggestion = getSuggestionsByFilterKey(
                          "arrivalAirports"
                        ).find(
                          (suggestion) => suggestion.airport_name.toLowerCase() ===
                            event.target.value.toLowerCase()
                        )

                        if (matchedSuggestion) {
                          field.onChange(matchedSuggestion.id)
                          dispatch(setArrivalAirportId(matchedSuggestion.id))

                          if (departure_airport?.value === matchedSuggestion.airport_name) {
                            setShowArrivalAirportWarning(true)
                            dispatch(setDepartureAirport(''))
                            dispatch(setDepartureAirportId(0))
                            departure_airport.value = ''
                          }

                        } else {
                          field.onChange("")
                          dispatch(setArrivalAirportId(null))
                        }

                        setFilterKey("arrivalAirports")
                        setErrorMessage("") // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.arrival_airport && (
                  <div className="text-danger">
                    {errors.arrival_airport.message}
                  </div>
                )}
                {showArrivalAirportWarning && (
                   <div class="text-danger"> Arrival Airport can not be the same as the Departure Airport </div>
                )}
              </Col>
            </Row>

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
