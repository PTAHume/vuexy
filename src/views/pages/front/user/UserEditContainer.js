import { toast } from 'react-toastify'
import { Check } from "react-feather"
import { useForm, Controller } from "react-hook-form"
import Avatar from "@components/avatar"
import defaultImage from "@src/assets/images/avatars/no-image.png"
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
  Input
} from "reactstrap"
import Select from "react-select"
import { useState, useEffect, Fragment } from "react"
import { useDispatch } from "react-redux" // Import useDispatch
import sanctumService from "@sanctum/sanctumService"
import { fetchuserDataSuccess } from "./store/userSlice"
import { selectThemeColors } from "@utils"
import { updateUserDetails } from "./api/updateUserDataApi"
import DeleteAccount from "./DeleteAccount"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import "@styles/react/libs/spinner/spinner.scss"
import '@styles/customSelectValidation.scss'

const UserEditContainer = ({ redux }) => {
  const [isLoading, setIsLoading] = useState(false)
  const options = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ]
  const [avatar, setAvatar] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const dispatch = useDispatch() // Get the dispatch method
  const sanctum = new sanctumService()
  const { id } = useParams() //this comes from URL
  const onChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      setSelectedFile(files[0])
      const reader = new FileReader()
      reader.onload = function () {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(files[0])
    } else {
      setSelectedFile(null)
      setPreviewUrl("")
    }
  }

  const handleImgReset = () => {
    setAvatar("")
  }

  useEffect(() => {
    const imageUrl = previewUrl || (redux.profile?.image ? `${sanctum.baseurl()}${redux.profile?.image}` : defaultImage)
    setAvatar(imageUrl)
  }, [redux.profile?.image, previewUrl])


  const SignupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Valid email required'),
    password: yup.string().required('Password required'),
    mobile: yup.string().required('mobile required'),
    status: yup.object().transform((value, originalValue) => {
      return originalValue ?? value
    }).typeError("Status is required")
  })

  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const userProfile = {
        id,
        email: data.email,
        password: data.password,
        name: data.name,
        mobile: data.mobile,
        status: parseInt(data.status?.value, 10)
      }
      if (selectedFile) {
        userProfile.image = selectedFile
      } else if (redux.profile?.image) {
        userProfile.image = redux.profile?.image
      } else {
        userProfile.image = ""
      }
      const res = await updateUserDetails(userProfile)

      if (res.status === 201) {
        setIsLoading(false)
        localStorage.setItem("lastUpdated", Date.now())

        dispatch(fetchuserDataSuccess(res.data))

        toast(
          <div className="d-flex">
            <div className="me-1">
              <Avatar
                size="sm"
                color="success"
                icon={<Check size={12} />}
              />
            </div>
            <div className="d-flex flex-column">
              <h6>Form Submitted!</h6>
              <div></div>
              <span>You have successfully updated the User details!</span>
            </div>
          </div>
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleReset = () => {
    reset({
      email: "",
      mobile: "",
      password: "",
      name: ""
    })
  }
  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Edit User Details</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatar}
                alt="Generic placeholder image"
                height="70"
                width="100"
              />
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                >
                  Upload
                  <Input
                    type="file"
                    onChange={onChange}
                    hidden
                    accept="image/*"
                  />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  onClick={handleImgReset}
                >
                  Reset
                </Button>
                <p className="mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800kB
                </p>
              </div>
            </div>
          </div>

          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <Label className="form-label" for="NameAsync">
                Name
              </Label>
              <Controller
                defaultValue={redux.profile?.name || ""}
                control={control}
                rules={{
                  required: "Name is required"
                }}
                id="NameAsync"
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Name"
                    invalid={errors.name && true}
                  />
                )}
              />
              {errors.name && (
                <FormFeedback>{errors.name.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="mobileAsync">
                Mobile Phone
              </Label>
              <Controller
                defaultValue={redux.profile?.mobile || ""}
                control={control}
                rules={{
                  required: "Mobile is required"
                }}
                id="mobileAsync"
                name="mobile"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Phone"
                    type="mobile"
                    invalid={errors.mobile && true}
                  />
                )}
              />
              {errors.mobile && (
                <FormFeedback>{errors.mobile.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="emailAsync">
                Email
              </Label>
              <Controller
                name="email"
                id="emailAsync"
                defaultValue={redux.profile?.email || ""}
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@email.com"
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && (
                <FormFeedback>{errors.email.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="passwordAsync">
                Password
              </Label>
              <Controller
                defaultValue={redux.profile?.password || ""}
                control={control}
                rules={{ required: "Password is required" }}
                id="passwordAsync"
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    invalid={errors.password && true}
                  />
                )}
              />
              {errors.password && (
                <FormFeedback>{errors.password.message}</FormFeedback>
              )}
            </div>

            <div className="mb-1">
              <Label className="form-label" for="statusAsync">
                Status
              </Label>
              <Controller
                name="status"
                id="statusAsync"
                control={control}
                defaultValue={options.find(
                  (option) => option.value ===
                    (redux.profile && parseInt(redux.profile?.status, 10))
                )}
                render={({ field }) => {
                  return (
                    <Select
                      options={options}
                      classNamePrefix="select"
                      className={errors.status && true ? 'isInvalid' : 'none'}
                      theme={selectThemeColors}
                      {...field}
                      value={field.value}
                    />
                  )
                }}
                autocomplete="off" // Add this lin
              />
              {errors.status && <FormFeedback style={{ display: 'flex' }}>{errors.status.message}</FormFeedback>}
            </div>

            <div className="d-flex">
              <Button
                className="me-1"
                color="primary"
                disabled={isLoading}
                type="submit"
              >
                Submit
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
            <div
              id="loading-overlay"
              style={{ display: isLoading ? "flex" : "none" }}
            >
              <div className="loader"></div>
            </div>
          </Form>
        </CardBody>
      </Card>
      <DeleteAccount id={id} />
    </Fragment>
  )
}

export default UserEditContainer
