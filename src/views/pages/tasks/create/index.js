import React, { useEffect, useState } from 'react'
import { Col, Row, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap'

import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Custom Components
import ReactSelect from 'react-select'
import { toast, Slide } from 'react-toastify'
import Toast from "@src/views/components/toast/Toast"


// ** Store & Actions
import { createTask, getTask, updateTask } from '../store'
import { useDispatch } from 'react-redux'

// ** Routes import 
import { useHistory, useParams } from 'react-router-dom'
import { isEmpty } from '../../../../helper/function'

const CreateTaks = () => {


  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ]

  // ** Params
  const { id: taskId } = useParams()


  // ** Function to get task info
  const getTaskInfo = async () => {
    if (isEmpty(taskId)) return

    const response = await dispatch(getTask({taskId}))
    if (!response.payload.status) {
      toast.error(<Toast status='error' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
    } else {
      const { title, priority, description } = response.payload.data
      formik.setValues({ title, priority, description })
    }
  }

  useEffect(() => {
    getTaskInfo()
  }, [taskId])

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Router Vars
  const history = useHistory()


  // ** States Vars
  const [isLoading, setIsLoading] = useState(false)

  // ** Function to handle form 
  const formik = useFormik({
    initialValues: {
      title: '',
      priority: '',
      description: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Required').max(50, 'Must be 50 characters or less'),
      priority: yup.string().required('Required'),
      description: yup.string().required('Required').max(500, 'Must be 500 characters or less'),
    }),
    onSubmit: (values) => {
      if (!isEmpty(taskId)) {
        handleTaskUpdate(values)
      } else {
        handleTaskSubmit(values)
      }
    }

  })

  
  // ** Function to handle form update
  const handleTaskUpdate = async (values) => {
    try {
      const { title, priority, description } = values
      setIsLoading(true)
      const response = await dispatch(updateTask({ title, priority, description, taskId }))
      if (response.payload.status) {
        toast.success(<Toast status='success' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
        history.push('/dashboard')
      } else {
        toast.error(<Toast status='error' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }


  // ** Function to handle form submit
  const handleTaskSubmit = async (values) => {
    try {
      const { title, priority, description } = values
      setIsLoading(true)
      const response = await dispatch(createTask({ title, priority, description }))
      if (response.payload.status) {
        toast.success(<Toast status='success' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
        history.push('/dashboard')
      } else {
        toast.error(<Toast status='error' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
   
  }

  return (
    <div className='invoice-add-wrapper'>
      <Card>
        <CardHeader>
          <h4 className='invoice-add-title'>
            { isEmpty(taskId) ? 'Create Task' : 'Update Task'}
          </h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl='6' md='6' sm='12'>
                <FormGroup>
                  <Label for='task-name'>Title</Label>
                  <Input
                    type='text'
                    name='title'
                    className={`form-control ${formik.errors.title && formik.touched.title ? 'is-invalid' : ''}`}
                    id='task-name'
                    placeholder='Title'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    invalid={formik.errors.title && formik.touched.title}
                  />

                  {formik.errors.title && formik.touched.title && <span className='text-danger'>{formik.errors.title}</span>}
                  
                </FormGroup>
              </Col>
              <Col xl='6' md='6' sm='12'>
                <FormGroup>
                  <Label for='task-priority'>Priority</Label>
                  <ReactSelect 
                    id='task-priority'
                    options={priorityOptions}
                    className={`px-0 mx-0 ${formik.errors.priority && formik.touched.priority ? 'is-invalid' : ''}`}
                    onChange={data => {
                      formik.setFieldValue('priority', data.value)
                    }}
                    value={priorityOptions.filter(obj => obj.value === formik.values.priority)}
                    isClearable={false}
                    isSearchable={false}
                    invalid={formik.errors.priority && formik.touched.priority}
                  />

                  {formik.errors.priority && formik.touched.priority && <span className='text-danger'>{formik.errors.priority}</span>}
                </FormGroup>
              </Col>

              <Col xl='12' md='12' sm='12'>
                <FormGroup>
                  <Label for='task-due-date'>Description</Label>
                  <Input
                   type='textarea'
                   rows='5'
                    name='description'
                    className={`form-control ${formik.errors.description && formik.touched.description ? 'is-invalid' : ''}`}
                    id='task-description'
                    placeholder='Description'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    invalid={formik.errors.description && formik.touched.description}
                  />


                  {formik.errors.description && formik.touched.description && <span className='text-danger'>{formik.errors.description}</span>}

                </FormGroup>
              </Col>

              <Col xl='12' md='12' sm='12'>
                <div className='d-flex justify-content-end'>
                  {isEmpty(taskId) && <Button onClick={formik.resetForm} disabled={isLoading} color='secondary' type='reset' className='me-1'>
                    Reset
                  </Button>}
                  {!isEmpty(taskId) && <Button onClick={() => history.goBack()} disabled={isLoading} color='danger' type='reset' outline className='me-1'>
                    Cancel
                  </Button>}
                  <Button disabled={isLoading} color='primary' type='submit'>
                    {isLoading ? 'Please wait...' : !isEmpty(taskId) ? 'Update Task' : 'Create Task'}
                  </Button>

                </div>
              </Col>
            </Row>

          </Form>
        </CardBody>
      </Card>

     
    </div>
  )
}

export default CreateTaks
