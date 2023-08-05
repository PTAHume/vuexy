// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/pages/admin/authentication/Login'))
// const LoginBasic = lazy(() => import('../../views/pages/admin/authentication/LoginBasic'))
// const LoginCover = lazy(() => import('../../views/pages/admin/authentication/LoginCover'))

const Register = lazy(() => import('../../views/pages/admin/authentication/Register'))
// const RegisterBasic = lazy(() => import('../../views/admin/pages/authentication/RegisterBasic'))
// const RegisterCover = lazy(() => import('../../views/admin/pages/authentication/RegisterCover'))
// const RegisterMultiSteps = lazy(() => import('../../views/pages/authentication/register-multi-steps'))

const ForgotPassword = lazy(() => import('../../views/pages/admin/authentication/ForgotPassword'))
// const ForgotPasswordBasic = lazy(() => import('../../views/admin/pages/authentication/ForgotPasswordBasic'))
// const ForgotPasswordCover = lazy(() => import('../../views/admin/pages/authentication/ForgotPasswordCover'))

// const ResetPasswordBasic = lazy(() => import('../../views/pages/admin/authentication/ResetPasswordBasic'))
// const ResetPasswordCover = lazy(() => import('../../views/pages/admin/authentication/ResetPasswordCover'))

// const VerifyEmailBasic = lazy(() => import('../../views/pages/admin/authentication/VerifyEmailBasic'))
// const VerifyEmailCover = lazy(() => import('../../views/pages/admin/authentication/VerifyEmailCover'))

// const TwoStepsBasic = lazy(() => import('../../views/pages/admin/authentication/TwoStepsBasic'))
// const TwoStepsCover = lazy(() => import('../../views/pages/admin/authentication/TwoStepsCover'))

const AuthenticationRoutes = [
  {
    path: 'admin/login',
    element: <Login />,
    meta: {
        layout: 'blank',
        publicRoute: true,
        restricted: true
      }
  },
//   {
//     path: '/pages/login-basic',
//     element: <LoginBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/login-cover',
//     element: <LoginCover />,
//     meta: {
//       layout: 'blank'
//     }
//   },
  {
    path: 'admin/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
//   {
//     path: '/pages/register-basic',
//     element: <RegisterBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/register-cover',
//     element: <RegisterCover />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/register-multi-steps',
//     element: <RegisterMultiSteps />,
//     meta: {
//       layout: 'blank'
//     }
//   },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
//   {
//     path: '/pages/forgot-password-basic',
//     element: <ForgotPasswordBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/forgot-password-cover',
//     element: <ForgotPasswordCover />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/reset-password-basic',
//     element: <ResetPasswordBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/reset-password-cover',
//     element: <ResetPasswordCover />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/verify-email-basic',
//     element: <VerifyEmailBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/verify-email-cover', 
//     element: <VerifyEmailCover />,
//     meta: {
//       layout: 'blank'
//     }  
//   },
//   {
//     path: '/pages/two-steps-basic',
//     element: <TwoStepsBasic />,
//     meta: {
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/pages/two-steps-cover',
//     element: <TwoStepsCover />,
//     meta: {
//       layout: 'blank'
//     }
//   }
]

export default AuthenticationRoutes
