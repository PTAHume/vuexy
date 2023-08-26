import { Fragment, useState } from 'react'
import { Label, Row, Col, Button, Form, FormFeedback } from 'reactstrap'
import { useDispatch } from "react-redux"
import { useForm, Controller } from 'react-hook-form'
import { isObjEmpty, selectThemeColors} from '@utils'
import { ArrowRight } from 'react-feather'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from "react-select"
import {
  setDeliveryType
} from "../store"
import "flatpickr/dist/themes/dark.css"
import "@styles/react/libs/flatpickr/flatpickr.scss"

const DealType = ({ stepper }) => {
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showWarning, setShowWarning] = useState(false)
  const dispatch = useDispatch()
  const dealOptions = [
    { name: 'Airline Baggage Delivery', value: 0, disabled: false },
    { name: 'Car/Truck Delivery', value: 1, disabled: true },
    { name: 'Coupons', value: 2, disabled: true },
    { name: 'Vacation', value: 3, disabled: true }
  ]
  const baggage_type = [
    { value: "baggage", label: "Baggage" },
    { value: "hand_luggage", label: "Hand Luggage" },
    { value: "document", label: "Document" }
  ]
  const handleDealSelection = (dealType) => {
    setShowWarning(false)
    setSelectedDeal(selectedDeal === dealType ? null : dealType.value)
  }
  const SignupSchema = yup.object().shape({
    baggage_type: selectedDeal !== null ? yup.string().required('Baggage Type is required') : yup.string()
  })
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  })
  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='content-header'>
        <h5 className='mb-0'>Deal Type</h5>
        <small>Select a deal type to proceed.</small>
      </div>
      <Row>
        {dealOptions.map((deal) => (
          <Col md='6' className='mb-1' key={deal.value}>
            <Button
              color={selectedDeal === deal.value ? 'primary' : 'secondary'}
              block
              disabled={deal.disabled}
              onClick={() => handleDealSelection(deal)}
            >
              {deal.name}
            </Button>
            {selectedDeal === 0 && deal.value === 0 &&
              <Fragment>
                <Label for="baggage_type">Select Baggage Type</Label>
                <Controller
                  name="baggage_type"
                  id="baggage_typeAsync"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    // Find the selected option object based on the field value
                    const selectedOption = baggage_type.find(
                      (option) => option.value === field.value
                    )
                    return (
                      <Select
                        options={baggage_type}
                        classNamePrefix="select"
                        className={errors.baggage_type && true ? 'isInvalid' : 'none'}
                        theme={selectThemeColors}
                        {...field}
                        value={field.value ? selectedOption : null}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.value)
                          dispatch(setDeliveryType(selectedOption.value))
                        }}
                      />
                    )
                  }}
                  autocomplete="off" // Add this lin
                />
                {errors.baggage_type && <FormFeedback style={{ display: 'flex' }}>{errors.baggage_type.message}</FormFeedback>}
              </Fragment>
            }
          </Col>
        ))}
      </Row>
      <div className='d-flex justify-content-end'>
        <Button type="submit" color="primary" className="btn-next" disabled={selectedDeal === null || !isObjEmpty(errors)}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>

    </Form >
  )
}

export default DealType
