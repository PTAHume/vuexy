import { Fragment, useState } from 'react'
import { Button, Row, Col, Alert } from 'reactstrap'

const DealType = ({ stepper }) => {
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showWarning, setShowWarning] = useState(false)

  const dealOptions = [
    { name: 'Airline Baggage Delivery', disabled: false },
    { name: 'Car/Truck Delivery', disabled: true },
    { name: 'Coupons', disabled: true },
    { name: 'Vacation', disabled: true }
  ]

  const handleDealSelection = (dealType) => {
    setShowWarning(false)
    setSelectedDeal(selectedDeal === dealType ? null : dealType)
  }

  const handleNextClick = () => {
    if (selectedDeal) {
      console.log('Selected Deal:', selectedDeal)
      stepper.next()
    } else {
      setShowWarning(true)
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Deal Type</h5>
        <small>Select a deal type to proceed.</small>
      </div>
      {showWarning && (
        <Alert color='warning'>
          Please select a deal type.
        </Alert>
      )}
      <Row>
        {dealOptions.map((deal, index) => (
          <Col md='6' className='mb-1' key={index}>
            <Button
              color={selectedDeal === deal.name ? 'primary' : 'secondary'}
              block
              disabled={deal.disabled}
              onClick={() => handleDealSelection(deal.name)}
            >
              {deal.name}
            </Button>
          </Col>
        ))}
      </Row>
      <div className='d-flex justify-content-end'>
        <Button onClick={handleNextClick} color='primary' className='btn-next'>
          Next
        </Button>
      </div>
    </Fragment>
  )
}

export default DealType
