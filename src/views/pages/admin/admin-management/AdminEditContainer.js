import { Check } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Avatar from '@components/avatar'
import defaultImage from '@src/assets/images/avatars/no-image.png';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, FormFeedback, CardHeader, CardTitle, CardBody, Button, Form, Label, Input } from 'reactstrap'
import Select from 'react-select'
import { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux' // Import useDispatch
import sanctumService from '../../../../@core/auth/sanctum/sanctumService'
import axios from 'axios';
import {  fetchAdminDataSuccess } from './store/adminSlice';
import { selectThemeColors } from '@utils'
import "@styles/react/libs/spinner/spinner.scss";
import getCsrfToken from '@src/auth/sanctum/csrf';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo'
import { getHomeRouteForLoggedInUser } from '@utils'
import { updateAdminDetails } from './api/updateAdminDataApi';
 import DeleteAccount from './DeleteAccount'

//TODO : we need to make sure that updated REDUX IS LOADING AFTER NAVAIGATING!!!!!!!!!!!!!!!!!!!!!!!!!



const AdminEditContainer  = ({ redux }) => {
  const [isLoading, setIsLoading] = useState(false);
  const options = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];
  //image things
  const [avatar, setAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch method
  const sanctum = new sanctumService();
  const { id } = useParams(); //this comes from URL


  const onChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      const reader = new FileReader();
      reader.onload = function () {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };
  


  const handleImgReset = () => {
    setAvatar('')
  }
   

  useEffect(() => {
    const imageUrl = previewUrl
      ? previewUrl
      : redux.adminData[id]?.image
      ? `${sanctum.baseurl()}${redux.adminData[id]?.image}`
      : defaultImage;
    setAvatar(imageUrl);
  }, [redux.adminData[id]?.image, previewUrl]);
  
  
  
   
// console.log(useSelector((state) => state.adminData.image));
//    console.log(redux.adminData)
 

 
  const onSubmit = async data => {
    setIsLoading(true);
    const allFieldsFilled = Object.values(data).every(
      (field) => (typeof field === "object" && field !== null) || field.length > 0);
  
    if (allFieldsFilled) {
      if (Object.values(data).every(field => (typeof field === "object" && field !== null) || field.length > 0) &&
        (!errors || Object.keys(errors).length === 0)) {
        
        // const [avatar, setAvatar] = useState(data.image ? data.image : '')

        try {
          const adminData = {
            id,
            email: data.email,
            password: data.password,
            type: data.type,
            name: data.name,
            mobile: data.mobile,
            status: parseInt(data.status.value, 10),
          };
          
      
          if (selectedFile) {
            adminData.image = selectedFile;
          } else if (redux.adminData[id]?.image) {
            adminData.image = redux.adminData[id]?.image;
          } else { 
            adminData.image = '';
          }
          const res = await updateAdminDetails(adminData);
    
          if (res.status === 201) {
          setIsLoading(false);
          localStorage.setItem('lastUpdated', Date.now());
          dispatch(fetchAdminDataSuccess(res.data));
        

        toast(
          <div className='d-flex'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6>Form Submitted!</h6>
              <div>
              </div>
              <span>You have successfully updated the Admin details!</span>
              </div>
            </div>
        )
        // ability.update(res.data.userData.ability)
        //we can differentiate merchant and admin here
        // navigate(getHomeRouteForLoggedInUser(resData.type));
        //navigate(getHomeRouteForLoggedInUser("admin"));
      
        }
            } catch(error)  {
              setIsLoading(false);
              if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                if (errors.email) {
                  setError("email", {
                    type: "manual",
                    message: errors.email ? errors.email : "Incorrect correct email",
                  });
                } else if (errors.password) {
                  setError("password", {
                    type: "manual",
                    message: errors.password ? errors.password : "Incorrect correct password",
                  });
                } else if (errors.name) {
                  setError("name", {
                    type: "manual",
                    message: errors.name ? errors.name : "Incorrect correct name",
                  });
                } else if (errors.type) {
                  setError("type", {
                    type: "manual",
                    message: errors.type ? errors.type : "Incorrect correct type",
                  });
                } else if (errors.mobile) {
                  setError("mobile", {
                    type: "manual",
                    message: errors.mobile ? errors.mobile : "Incorrect correct mobile",
                  });
                } else if (errors.status) {
                  setError("status", {
                    type: "manual",
                    message: errors.status ? errors.status : "Incorrect correct status",
                  });
                } else if (errors.image) {
                  setError("image", {
                    type: "manual",
                    message: errors.image ? errors.image : "Incorrect image",
                  });
                }
              } else {
                console.error("Unexpected error:", error);
              }
            }
        }
      } else {
        for (const key in data) {
          if (!data[key] || data[key].length === 0) {
            setError(key, {
              type: "manual",
              message: `The ${key} field is required.`,
            });
          }
        }
        setIsLoading(false);
      }
  }
  const handleReset = () => {
    reset({
      email: '',
      mobile: '',
      password: '',
      name: ''
    })
  }

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()







    return (
      <Fragment>
      <Card>
      <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Edit Admin Details</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
       
        <div className='d-flex'>
          <div className='me-25'>
            <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='70' width='100' />
          </div>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                Upload
                <Input type='file' onChange={onChange} hidden accept='image/*' />
              </Button>
              <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                Reset
              </Button>
              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              {errors.image && <span className='text-danger'>{errors.image.message}</span>}
            </div>
          </div>
        </div>


        <Form className='mt-2 pt-50'  onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-1'>
              <Label className='form-label' for='NameAsync'>
                Name
              </Label>
              <Controller
               defaultValue={redux.adminData[id]?.name || ''}
                control={control}
                rules={{
                  required: 'Name is required',
                }}
                id='NameAsync'
                name='name'
                render={({ field }) => <Input {...field} placeholder='Name' invalid={errors.name && true} />}
              />
               {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='mobileAsync'>
                Mobile Phone
              </Label>
              <Controller
                defaultValue={redux.adminData[id]?.mobile ||  '' }
                control={control}
                rules={{
                  required: 'Mobile is required',
                }}
                id='mobileAsync'
                name='mobile'
                render={({ field }) => <Input {...field} placeholder='Phone' type='mobile' invalid={errors.mobile && true} />}
              />
               {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='emailAsync'>
                Email
              </Label>
              <Controller
                name='email'
                id='emailAsync'
                defaultValue={redux.adminData[id]?.email || ''}
                control={control}
                rules={{required:"Email is required",}}
                render={({ field }) => (
                  <Input {...field} type='email' placeholder='example@email.com' invalid={errors.email && true} />
                )}
              />
               {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='passwordAsync'>
                Password
              </Label>
              <Controller
                defaultValue={redux.adminData[id]?.password || ''}
                control={control}
                rules={{required:"Password is required",}}
                id='passwordAsync'
                name='password'
                render={({ field }) => (
                  <Input {...field} type='password' placeholder='Password' invalid={errors.password && true} />
                )}
              />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
            </div>


            <div className='mb-1'>
              <Label className='form-label' for='typeAsync'>
                Admin Type
              </Label>
              <Controller
                defaultValue={redux.adminData[id]?.type ||  ''}
                control={control}
                id='typeAsync'
                name='type'
                render={({ field }) => (
                  <Input {...field} type='text' placeholder='type' invalid={errors.type && true} />
                )}
              />
               {errors.type && <FormFeedback>{errors.type.message}</FormFeedback>}
            </div>

            <div className='mb-1'>
        <Label className='form-label' for='statusAsync'>
          Status
        </Label>
        <Controller
          id='react-select'
          control={control}
          name='status'
          defaultValue={options.find(
            (option) =>
              option.value ===
              (redux.adminData && parseInt(redux.adminData[id]?.status, 10))
          )}
          render={({ field }) => (
            <Select
              options={options}
              classNamePrefix='select'
              theme={selectThemeColors}
              {...field}
            />
          )}
        />
        {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
      </div>
           

            <div className='d-flex'>
              <Button className='me-1' color='primary'  disabled={isLoading} type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>
            <div id='loading-overlay' style={{ display: isLoading ? 'flex' : 'none' }}>
              <div className='loader'></div>
            </div>
          </Form>
        </CardBody>
     
      </Card>
      <DeleteAccount id={id} />
      </Fragment>
          )
  }







export default AdminEditContainer