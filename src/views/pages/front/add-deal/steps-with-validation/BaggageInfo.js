import { Fragment, useState } from 'react'
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectThemeColors, getReduxUserData } from '@utils'
import * as yup from 'yup'
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import sanctumService from "../../../../../@core/auth/sanctum/sanctumService"
import moment from 'moment'
import { toast } from 'react-toastify'
import Avatar from "@components/avatar"
import { useNavigate } from 'react-router-dom'
import {
  dealDataSucceeded
} from "../store"
import '@styles/react/libs/react-select/_react-select.scss'
import './CustomSelectValidation.scss'

const BaggageInfo = ({ stepper }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const get_departure_country_id = useSelector(
    (state) => state.useDealData?.departure_country_id
  )
  const get_departure_city_id = useSelector(
    (state) => state.useDealData?.departure_city_id
  )
  const get_arrival_country_id = useSelector(
    (state) => state.useDealData?.arrival_country_id
  )
  const get_arrival_city_id = useSelector(
    (state) => state.useDealData?.arrival_city_id
  )
  const get_departure_airport_id = useSelector(
    (state) => state.useDealData?.departure_airport_id
  )
  const get_arrival_airport_id = useSelector(
    (state) => {
      return state.useDealData?.departure_airport_id
    }
  )
  const get_departure_date = useSelector(
    (state) => {
      return state.useDealData?.departureDate
    }
  )
  const get_arrival_date = useSelector(
    (state) => {
      return state.useDealData?.arrivalDate
    }
  )
  const get_delivery_type = useSelector(
    (state) => {
      return state.useDealData?.deliveryType
    }
  )

  const [isLoading, setIsLoading] = useState(false)
  const sanctum = new sanctumService()
  const duty_free = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" }
  ]
  const SignupSchema = yup.object().shape({
    price: yup.number()
      .typeError('Price is required')
      .required('Price is required')
      .positive()
      .min(1, "Min value of 1")
      .max(1000, "Max value of 1000"),
    weight: yup.number().typeError('Weight is required')
      .min(1, "Min value of 1").required('Weight is required'),
    duty_free: yup.string().required('Duty free is required')
  })
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  })
  const reduxUserData = useSelector((state) => getReduxUserData(state))
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const dealData = {
        user_id: reduxUserData.id,
        delivery_type: get_delivery_type,
        price: data.price,
        weight: data.weight,
        departure_airport_id: get_departure_airport_id,
        arrival_country_id: get_arrival_country_id,
        arrival_city_id: get_arrival_city_id,
        departure_city_id: get_departure_city_id,
        arrival_airport_id: get_arrival_airport_id,
        departure_country_id: get_departure_country_id,
        departure_date: moment(get_departure_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        arrival_date: moment(get_arrival_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        duty_free: Boolean(data.duty_free)
      }
      console.log(JSON.stringify(dealData))
      const res = await sanctum.addDeal(dealData)
      if (res.status === 201) {
        setIsLoading(false)
        localStorage.setItem("lastUpdated", Date.now())
        dispatch(dealDataSucceeded())
        toast(
          <div className="d-flex">
            <div className="me-1">
              <Avatar size="sm" color="success" icon={<Check size={12} />} />
            </div>
            <div className="d-flex flex-column">
              <h6>Form Submitted!</h6>
              <div></div>
              <span>You have successfully added the new dea!</span>
            </div>
          </div>
        )
        navigate('/home')
        return true
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Personal Info</h5>
        <small>Enter Your Personal Info.</small>
      </div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="4" >
            {/* Weight */}
            <Label for="weight">Weight</Label>
            <Controller
              control={control}
              id="weightAsync"
              name="weight"
              render={({ field }) => (
                <Input
                  {...field}
                  // value={field.value || reduxStore?.weight || ''}
                  value={field.value || ""}
                  type="number"
                  placeholder="Weight"
                  step="0.01"
                  invalid={errors.weight && true}
                />
              )}
              autocomplete="off" // Add this lin
            />
            {errors.weight && <FormFeedback>{errors.weight.message}</FormFeedback>}
          </Col>
          <Col xs="4">
            {/* Price */}
            <Label for="Price Range"> Price</Label>
            <Controller
              control={control}
              defaultValue=""
              name="price"
              id="priceeAsync"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="price"
                  className="price-input mr-1"
                  invalid={errors.price && true}
                />
              )}
              autocomplete="off" // Add this lin
            />
            {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
          </Col>
          <Col xs="4">
            <Label for="duty_free">Is Duty Free</Label>
            <Controller
              name="duty_free"
              id="duty_freeAsync"
              control={control}
              defaultValue=""
              render={({ field }) => {
                // Find the selected option object based on the field value
                const selectedOption = duty_free.find(
                  (option) => option.value === field.value
                )
                return (
                  <Select
                    options={duty_free}
                    classNamePrefix="select"
                    className={errors.duty_free && true ? 'isInvalid' : 'none'}
                    theme={selectThemeColors}
                    {...field}
                    value={field.value ? selectedOption : null}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value)
                    }}
                  />
                )
              }}
              autocomplete="off" // Add this lin
            />
            {errors.duty_free && <FormFeedback style={{ display: 'flex' }}>{errors.duty_free.message}</FormFeedback>}
          </Col>
        </Row>

        <br />
        <br />
        <div className="d-flex justify-content-between">
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default BaggageInfo
