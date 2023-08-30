import { toast } from 'react-toastify'
import { useForm, Controller } from "react-hook-form"
import { useParams } from "react-router-dom"
import {
  Card,
  FormFeedback,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  Row,
  Col,
  FormGroup
} from "reactstrap"
import Select from "react-select"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux" // Import useDispatch
import sanctumService from "../../../../@core/auth/sanctum/sanctumService"
import { fetchDealDataSuccess } from "./store/dealSlice"
import { selectThemeColors } from "@utils"
import "@styles/react/libs/spinner/spinner.scss"
import useFormDefaults from "../hooks/useFormDefaults"
import useDropdownHandlers from "../hooks/useDropdownHandlers"
import useFormSubmission from "../hooks/useFormSubmission"
import DealDelete from "./DeleteDeal"
import useDefaultDropdownValues from "../hooks/useDefaultDropdownValues"
import Flatpickr from "react-flatpickr"
import { format } from "date-fns"
import { FixedSizeList as List } from "react-window"
import "@styles/react/libs/flatpickr/flatpickr.scss"

const DealEditContainer = ({ redux }) => {
  const dispatch = useDispatch() // Get the dispatch method
  const sanctum = new sanctumService()
  const { id } = useParams() //this comes from URL

  const status_options = [
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" }
  ]

  const [inputValue, setInputValue] = useState("")

  const CustomMenuList = (props) => {
    const { options, children, maxHeight, getValue } = props
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * 35

    // Check if the input value doesn't match any city
    const noOptions = inputValue && !options.some((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    const adjustedHeight = noOptions ? 65 : maxHeight
    render(
      <List
        height={adjustedHeight}
        itemCount={noOptions ? 1 : children.length}
        itemSize={35}
        initialScrollOffset={initialOffset}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            {noOptions ? (
              <div style={{ ...style, textAlign: 'center' }}>No Option</div>
            ) : (
              children[index]
            )}
          </div>
        )}
      </List>
    )
  }


  const delivery_type = [
    { value: "hand_luggage", label: "Hand Luggage" },
    { value: "baggage", label: "Baggage" },
    { value: "document", label: "Document" }
  ]

  const duty_free = [
    { value: 0, label: "Inactive" },
    { value: 1, label: "Active" }
  ]

  const user_authenticated = [
    { value: 0, label: "Unauthenticated" },
    { value: 1, label: "Authenticated" }
  ]


  const {
    control,
    setValue,
    setError,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const countries = useSelector((state) => state.dealData.countries) //comes from FetchDealData
  const cities = useSelector((state) => state.dealData.cities) //comes from FetchDealData
  const airports = useSelector((state) => state.dealData.airports) //comes from FetchDealData

  useFormDefaults(setValue, watch, countries, cities, redux, id, airports)

  const {
    defaultDepartureCountry,
    defaultDepartureCity,
    defaultArrivalCity,
    defaultArrivalCountry,
    defaultUser
  } = useDefaultDropdownValues(countries, cities, airports, redux, id)

  const {
    handleDepartureCountryChange,
    handleArrivalCountryChange,
    handleDepartureCityChange,
    handleArrivalCityChange,
    filteredDepartureCities,
    filteredArrivalCities,
    filteredDepartureAirports,
    filteredArrivalAirports
  } = useDropdownHandlers(
    cities,
    airports,
    setValue,
    defaultDepartureCountry,
    defaultDepartureCity,
    defaultArrivalCity,
    defaultArrivalCountry,
    defaultUser
  )

  const { onSubmit, isLoading } = useFormSubmission(
    handleSubmit,
    errors,
    id,
    redux,
    sanctum,
    dispatch,
    fetchDealDataSuccess,
    toast,
    setError
  )
  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Edit Deal Details</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="priceAsync">
                    Price
                  </Label>
                  <Controller
                    defaultValue={
                      (redux.dealData && redux.dealData[id]?.price) || ""
                    }
                    control={control}
                    rules={{ required: "Price is required" }}
                    id="priceAsync"
                    name="price"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Price"
                        invalid={errors.price && true}
                      />
                    )}
                  />
                  {errors.price && (
                    <FormFeedback>{errors.price.message}</FormFeedback>
                  )}
                </div>
              </Col>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="weightAsync">
                    Weight
                  </Label>
                  <Controller
                    defaultValue={
                      (redux.dealData && redux.dealData[id]?.weight) || ""
                    }
                    control={control}
                    rules={{
                      required: "Weight is required"
                    }}
                    id="weightAsync"
                    name="weight"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Weight"
                        invalid={errors.weight && true}
                      />
                    )}
                  />
                  {errors.weight && (
                    <FormFeedback>{errors.weight.message}</FormFeedback>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="departure_countryAsync">
                    Departure Country
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Departure country is required"
                    }}
                    id="departure_countryAsync"
                    name="departure_country"
                    defaultValue={
                      countries ? countries.find(
                        (country) => country.id ===
                          (redux?.dealData[id]?.departure_country_id)
                      ) || "" : ""
                    }
                    render={({ field }) => {
                      const selectedCountry = countries?.find(
                        (country) => country.id === field.value
                      )

                      return (
                        <Select
                          options={[
                            ...(Array.isArray(countries) ? countries.map((country) => ({
                              value: country.id,
                              label: country.nicename
                            })) : [])
                          ]}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          value={
                            selectedCountry ? {
                              value: selectedCountry.id,
                              label: selectedCountry.nicename
                            } : null
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.value)
                            handleDepartureCountryChange(selectedOption.value)
                          }}
                        />
                      )
                    }}
                  />

                  {errors.departure_country && (
                    <FormFeedback>
                      {errors.departure_country.message}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="arrival_countryAsync">
                    Arrival Country
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Arrival country is required"
                    }}
                    id="arrival_countryAsync"
                    name="arrival_country"
                    defaultValue={
                      countries ? countries.find(
                        (country) => country.id === (redux?.dealData[id]?.arrival_country_id)
                      ) || "" : ""
                    }
                    render={({ field }) => {
                      const selectedCountry = countries?.find(
                        (country) => country.id === field.value
                      )

                      return (
                        <Select
                          options={[
                            ...(Array.isArray(countries) ? countries.map((country) => ({
                              value: country.id,
                              label: country.nicename
                            })) : [])
                          ]}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          value={
                            selectedCountry ? { value: selectedCountry.id, label: selectedCountry.nicename } : null
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.value)
                            handleArrivalCountryChange(selectedOption.value)
                          }}
                        />
                      )
                    }}
                  />
                  {errors.arrival_country && (
                    <FormFeedback>
                      {errors.arrival_country.message}
                    </FormFeedback>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="departure_cityAsync">
                    Departure City
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Departure city is required"
                    }}
                    id="departure_cityAsync"
                    name="departure_city"
                    className="my-custom-controller"
                    render={({ field }) => {
                      const selectedCity = cities?.find(
                        (city) => city.id === field.value
                      )

                      return (
                        <FormGroup className="my-custom-controller">
                          <Select
                            options={filteredDepartureCities.map((city) => ({
                              value: city.id,
                              label: city.name
                            }))}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            value={
                              selectedCity ? { value: selectedCity.id, label: selectedCity.name } : null
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption.value)
                              handleDepartureCityChange(selectedOption.value)
                            }}
                            className={
                              errors.departure_city ? "is-invalid" : ""
                            }
                            components={{ MenuList: CustomMenuList }}
                            //  maxMenuHeight={200}
                            // noOptionsMessage={() => 'No Option'} // Add this line
                            onInputChange={(value) => setInputValue(value)}
                          />
                          <FormFeedback>
                            {errors.departure_city?.message}
                          </FormFeedback>
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>

              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="arrival_cityAsync">
                    Arrival City
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Arrival city is required"
                    }}
                    id="arrival_cityAsync"
                    name="arrival_city"
                    defaultValue={
                      cities ? cities.find((city) => city.id === (redux?.dealData[id]?.arrival_city_id)) || "" : ""
                    }
                    render={({ field }) => {
                      const selectedCity = cities?.find(
                        (city) => city.id === field.value
                      )

                      return (
                        <FormGroup className="my-custom-controller">
                          <Select
                            options={filteredArrivalCities.map((city) => ({
                              value: city.id,
                              label: city.name
                            }))}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            value={
                              selectedCity ? { value: selectedCity.id, label: selectedCity.name } : null
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption.value)
                              handleArrivalCityChange(selectedOption.value)
                            }}
                            className={errors.arrival_city ? "is-invalid" : ""}
                            components={{ MenuList: CustomMenuList }}
                            //  maxMenuHeight={200}
                            // noOptionsMessage={() => 'No options'} // Add this line
                            onInputChange={(value) => setInputValue(value)}
                          />
                          {errors.arrival_city && (
                            <FormFeedback>
                              {errors.arrival_city.message}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="departure_airportAsync">
                    Departure Airport
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Departure Airport is required"
                    }}
                    id="departure_airportAsync"
                    name="departure_airport"
                    defaultValue={
                      airports ? airports.find((airport) => airport.id === (redux?.dealData[id]?.departure_airport_id)) || "" : ""
                    }
                    render={({ field }) => {
                      const selectedAirport = airports?.find(
                        (airport) => airport.id === field.value
                      )

                      return (
                        <FormGroup className="my-custom-controller">
                          <Select
                            options={filteredDepartureAirports.map(
                              (airport) => ({
                                value: airport.id,
                                label: airport.airport_name
                              })
                            )}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            value={selectedAirport ? { value: selectedAirport.id, label: selectedAirport.airport_name } : null
                            }
                            onChange={(selectedOption) => field.onChange(selectedOption.value)
                            }
                            className={
                              errors.departure_airport ? "is-invalid" : ""
                            }
                          />
                          {errors.departure_airport && (
                            <FormFeedback>
                              {errors.departure_airport.message}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="arrival_airportAsync">
                    Arrival Airport
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Arrival airport is required"
                    }}
                    id="arrival_airportAsync"
                    name="arrival_airport"
                    defaultValue={
                      airports ? airports.find((airport) => airport.id === (redux?.dealData[id]?.arrival_airport_id)
                      ) || "" : ""
                    }
                    render={({ field }) => {
                      const selectedAirport = airports?.find(
                        (airport) => airport.id === field.value
                      )

                      return (
                        <FormGroup className="my-custom-controller">
                          <Select
                            options={filteredArrivalAirports.map((airport) => ({
                              value: airport.id,
                              label: airport.airport_name
                            }))}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            value={
                              selectedAirport ? { value: selectedAirport.id, label: selectedAirport.airport_name } : null
                            }
                            onChange={(selectedOption) => field.onChange(selectedOption.value)
                            }
                            className={
                              errors.arrival_airport ? "is-invalid" : ""
                            }
                          />
                          {errors.arrival_airport && (
                            <FormFeedback>
                              {errors.arrival_airport.message}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="departure_dateAsync">
                    Departure Date
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Departure date is required"
                    }}
                    id="departure_dateAsync"
                    name="departure_date"
                    defaultValue={
                      (redux?.dealData[id]?.departure_date) ||
                      ""
                    }
                    render={({ field }) => {
                      return (
                        <FormGroup className="my-custom-controller">
                          <div>
                            <Flatpickr
                              {...field}
                              value={field.value}
                              data-enable-time
                              id="departure-picker"
                              className={`form-control ${errors.departure_date ? "is-invalid" : ""
                                }`}
                              options={{
                                dateFormat: "Y-m-d H:i:S",
                                enableTime: true
                              }}
                              onChange={(selectedDates) => {
                                field.onChange(
                                  format(
                                    selectedDates[0],
                                    "yyyy-MM-dd HH:mm:ss"
                                  )
                                )
                              }}
                            />
                            {errors.departure_date && (
                              <FormFeedback>
                                {errors.departure_date.message}
                              </FormFeedback>
                            )}
                          </div>
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>

              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="arrival_dateAsync">
                    Arrival Date
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Arrival date is required"
                    }}
                    id="arrival_dateAsync"
                    name="arrival_date"
                    defaultValue={(redux?.dealData[id]?.arrival_date) || ""
                    }
                    render={({ field }) => {
                      return (
                        <FormGroup className="my-custom-controller">
                          <div>
                            <Flatpickr
                              {...field}
                              value={field.value}
                              data-enable-time
                              id="arrival-picker"
                              className={`form-control ${errors.arrival_date ? "is-invalid" : ""
                                }`}
                              options={{
                                dateFormat: "Y-m-d H:i:S",
                                enableTime: true
                              }}
                              onChange={(selectedDates) => {
                                field.onChange(
                                  format(
                                    selectedDates[0],
                                    "yyyy-MM-dd HH:mm:ss"
                                  )
                                )
                              }}
                            />

                            {errors.arrival_date && (
                              <FormFeedback>
                                {errors.arrival_date.message}
                              </FormFeedback>
                            )}
                          </div>
                        </FormGroup>
                      )
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="delivery_type">
                    Delivery Type
                  </Label>
                  <Controller
                    name="delivery_type"
                    id="delivery_typeAsync"
                    defaultValue={delivery_type.find(
                      (option) => option.value === (redux?.dealData[id]?.delivery_type)
                    )}
                    control={control}
                    rules={{ required: "Delivery Type is required" }}
                    render={({ field }) => (
                      <Select
                        options={delivery_type}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        {...field}
                      />
                    )}
                  />
                  {errors.delivery_type && (
                    <FormFeedback>{errors.delivery_type.message}</FormFeedback>
                  )}
                </div>
              </Col>

              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="statusAsync">
                    Status
                  </Label>
                  <Controller
                    id="react-select"
                    control={control}
                    name="status"
                    defaultValue={status_options.find(
                      (option) => option.value === (redux?.dealData[id]?.status)
                    )}
                    render={({ field }) => (
                      <Select
                        options={status_options}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        {...field}
                      />
                    )}
                  />
                  {errors.status && (
                    <FormFeedback>{errors.status.message}</FormFeedback>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="duty_free">
                    Duty Free Delivery
                  </Label>
                  <Controller
                    name="duty_free"
                    id="duty_freeAsync"
                    defaultValue={duty_free.find(
                      (option) => option.value === (redux?.dealData[id]?.duty_free)
                    )}
                    control={control}
                    rules={{ required: "Duty Free Field is required" }}
                    render={({ field }) => (
                      <Select
                        options={duty_free}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        {...field}
                      />
                    )}
                  />
                  {errors.duty_free && (
                    <FormFeedback>{errors.duty_free.message}</FormFeedback>
                  )}
                </div>
              </Col>

              <Col md="6 d-flex align-items-center justify-content-center">

                <Button
                  block
                  color="primary"
                  disabled={isLoading}
                  type="submit"
                  className='d-flex'
                >
                  Submit
                </Button>

              </Col>
            </Row>


            <div
              id="loading-overlay"
              style={{ display: isLoading ? "flex" : "none" }}
            >
              <div className="loader"></div>
            </div>
          </Form>
        </CardBody>
      </Card>
      <DealDelete id={id} />
    </Fragment>
  )
}

export default DealEditContainer
