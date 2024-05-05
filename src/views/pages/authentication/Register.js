// ** React Imports
import { useState } from 'react'


// ** React Imports
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'


// ** Third Party Components
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** Context

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback, FormGroup } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { toast, Slide } from 'react-toastify'
import Toast from "@src/views/components/toast/Toast"



const Register = () => {

  // ** Variables States
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const { skin } = useSkin()
  const history = useHistory()
 

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  // ** Custom handle User Register
  const handleUserRegister = async values => {
    try {
      setIsLoading(true)
      const response = await useJwt.register(values)
      if (response.data.status) {
        history.push('/login')
        toast.success(<Toast status='success' message={response.data.message} />, { transition: Slide, hideProgressBar: true })
      } else {
        toast.error(<Toast status='error' message={response.data.message} />, { transition: Slide, hideProgressBar: true })
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required('Required'),
        // password must be at least 8 characters and contain at least one number and one special character (!@#$%^&*) and one uppercase letter
        password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters').matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      }),
      onSubmit: values => {
        handleUserRegister(values)
      },
    })
 

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          
          <h2 className='brand-text text-primary ms-1'>Task Manager</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            
            <Form  onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  id='register-email'
                  placeholder='Enter your email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  invalid={formik.errors.email && formik.touched.email}
                />
                {formik.errors.email && formik.touched.email && <FormFeedback>{formik.errors.email}</FormFeedback>}
              </FormGroup>
              
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  id='register-password'
                  name='password'
                  placeholder='Enter your password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className='input-group-merge'
                  invalid={formik.errors.password && formik.touched.password}
                />
                {formik.errors.password && formik.touched.password && <FormFeedback>{formik.errors.password}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-confirm-password'>
                  Confirm Password
                </Label>
                <InputPasswordToggle
                  id='register-confirm-password'
                  name='confirmPassword'
                  placeholder='Confirm your password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className='input-group-merge'
                  invalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>}
              </FormGroup>
              <Button.Ripple disabled={isLoading} type='submit' color='primary' block>
                {isLoading ? 'Loading...' : 'Sign up'}
              </Button.Ripple>
            </Form>
            
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
