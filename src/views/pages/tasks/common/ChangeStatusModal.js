

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
import { updateTaskStatus } from '../store'

const ChangeStatusModal = ({ show, onSuccess, onClose, data }) => {

    const statusOptions = [
        { value: 'todo', label: 'Todo' },
        { value: 'in-progress', label: 'InProgress' },
        { value: 'completed', label: 'Completed' }
    ]

    // ** States
    const [isLoading, setIsLoading] = useState(false)

    // ** Dispatch
    const dispatch = useDispatch()

    // ** Function to handle taskStatus change
    const handleStatusChange = async (values) => {
        try {
            const { taskStatus } = values
            const updatedData = { taskId: data.taskId, taskStatus }
            setIsLoading(true)
            const res = await dispatch(updateTaskStatus(updatedData))
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
            taskStatus: data.taskStatus || ''
        },
        validationSchema: yup.object().shape({
            taskStatus: yup.string().required('Required')
        }),
        onSubmit: (values) => {
            handleStatusChange(values)
        }
    })

    return (
        <Modal  backdrop='static'  size='md' isOpen={show} centered toggle={onClose}>
            <ModalHeader toggle={onClose}>
                    Update Task Status
            </ModalHeader>

            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col lg='12' md='12' xl='12' sm='12'>
                        <FormGroup>
                            <Label for='priority'>Task Status</Label>
                            <ReactSelect
                                options={statusOptions}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                id='taskStatus'
                                name='taskStatus'
                                value={statusOptions.find(option => option.value === formik.values.taskStatus)}
                                onChange={(value) => formik.setFieldValue('taskStatus', value.value)}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.taskStatus && formik.errors.taskStatus && <FormFeedback className='d-block'>{formik.errors.taskStatus}</FormFeedback>}
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
export default ChangeStatusModal
