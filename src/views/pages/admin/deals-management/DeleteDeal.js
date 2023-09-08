import { Card, Button, CardHeader, CardTitle, CardBody, Alert, Form, Input, Label, FormFeedback } from 'reactstrap'
import Swal from 'sweetalert2'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import sanctumService from '@sanctum/sanctumService'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { useNavigate } from 'react-router-dom'
import { getHomeRouteForLoggedInUser } from '@utils'
import { setLoadingDeal } from './store/dealSlice'
import { useDispatch } from 'react-redux'

const defaultValues = {
  confirmCheckbox: false
}

const MySwal = withReactContent(Swal)

const DeleteDeal = ({ id }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sanctum = new sanctumService()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleConfirmDelete = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you would like to delete the deal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
      },
      buttonsStyling: false
    })

    if (result.value) {
      try {
        dispatch(setLoadingDeal(true))
        await sanctum.deleteAdminDeal(id)
        dispatch(setLoadingDeal(false))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your account has been deactivated.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })

        navigate(getHomeRouteForLoggedInUser())

      } catch (error) {
        console.log(error)
      }
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: 'Cancelled',
        text: 'Deletion Cancelled!!',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  }

  const onSubmit = data => {
    if (data.confirmCheckbox === true) {
      handleConfirmDelete()
    } else {
      setError('confirmCheckbox', { type: 'manual' })
    }
  }

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Delete Deal</CardTitle>
      </CardHeader>
      <CardBody className='py-2 my-25'>
        <Alert color='warning'>
          <h4 className='alert-heading'>Are you sure you want to delete a deal?</h4>
          <div className='alert-body fw-normal'>
            Once you delete your deal, there is no going back. Please be certain.
          </div>
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-check'>
            <Controller
              control={control}
              name='confirmCheckbox'
              render={({ field }) => (
                <Input
                  {...field}
                  type='checkbox'
                  id='confirmCheckbox'
                  checked={field.value}
                  invalid={errors.confirmCheckbox && true}
                />
              )}
            />
            <Label
              for='confirmCheckbox'
              className={classnames('form-check-label', {
                'text-danger': errors && errors.confirmCheckbox
              })}
            >
              I confirm to delete the deal
            </Label>
            {errors && errors.confirmCheckbox && (
              <FormFeedback>Please confirm that you want to delete a deal</FormFeedback>
            )}
          </div>
          <div className='mt-1'>
            <Button color='danger'>Delete Deal</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default DeleteDeal