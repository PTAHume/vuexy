// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
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
        content: <DealType stepper={stepper}  />
      },
    {
      id: 'deal-details',
      title: 'Deal Details',
      subtitle: 'Enter Your Deal Details.',
      content: <DealDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Personal Info',
      subtitle: 'Add Personal Info',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'Address',
      subtitle: 'Add Address',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Social Links',
      subtitle: 'Add Social Links',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
