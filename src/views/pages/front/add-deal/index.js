// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import BaggageInfo from './steps-with-validation/BaggageInfo'
import DealDetails from './steps-with-validation/DealDetails'
import DealType from './steps-with-validation/DealType'
const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'deal-type',
      title: 'Deal Type',
      subtitle: 'Chose Deal Type.',
      content: <DealType stepper={stepper} />
    },
    {
      id: 'deal-details',
      title: 'Deal Details',
      subtitle: 'Enter Your Deal Details.',
      content: <DealDetails stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Social Links',
      subtitle: 'Add Social Links',
      content: <BaggageInfo stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
