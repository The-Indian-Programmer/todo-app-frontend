

// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Form, FormGroup, Label, FormFeedback } from 'reactstrap'

// ** Custom Components
import ReactSelect from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'

import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { updateTaskPriority } from '../store'

const ChangePriorityModal = ({ show, onSuccess, onClose, data }) => {

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ]

    // ** States
    const [isLoading, setIsLoading] = useState(false)

    // ** Dispatch
    const dispatch = useDispatch()

    // ** Function to handle priority change
    const handlePriorityChange = async (values) => {
        try {
            const { priority } = values
            const updatedData = { taskId: data.taskId, priority }
            setIsLoading(true)
            const res = await dispatch(updateTaskPriority(updatedData))
            setIsLoading(false)
            if (!res.payload.status) return toast.error(<Toast status='error' message={res.payload.message} />, { transition: Slide, hideProgressBar: true })

            toast.success(<Toast status='success' message={res.payload.message} />, { transition: Slide, hideProgressBar: true })

            onSuccess()


        } catch (error) {
            setIsLoading(false)
           toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
        }
    }


    const formik = useFormik({
        initialValues: {
            priority: data.priority || ''
        },
        validationSchema: yup.object().shape({
            priority: yup.string().required('Required')
        }),
        onSubmit: (values) => {
            handlePriorityChange(values)
        }
    })

    return (
        <Modal  backdrop='static'  size='md' isOpen={show} centered toggle={onClose}>
            <ModalHeader toggle={onClose}>
                    Update Priority
            </ModalHeader>

            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col lg='12' md='12' xl='12' sm='12'>
                        <FormGroup>
                            <Label for='priority'>Priority</Label>
                            <ReactSelect
                                options={priorityOptions}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                id='priority'
                                name='priority'
                                value={priorityOptions.find(option => option.value === formik.values.priority)}
                                onChange={(value) => formik.setFieldValue('priority', value.value)}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.priority && formik.errors.priority && <FormFeedback className='d-block'>{formik.errors.priority}</FormFeedback>}
                        </FormGroup>
                    </Col>

                    <Col lg='12' md='12' xl='12' sm='12'>
                        <Button disabled={isLoading} color='primary' type='submit' className='me-1'>
                            {isLoading ? 'Loading...' : 'Update'}
                        </Button>
                        <Button disabled={isLoading} color='secondary' onClick={onClose}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
                </Form>
                
            </ModalBody>
        </Modal>

    )
}
export default ChangePriorityModal
