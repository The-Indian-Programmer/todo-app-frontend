// ** React Imports

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalBasic = ({ show, handleClose, handleSubmit }) => {

    return (

        <Modal isOpen={show} centered toggle={handleClose}>
            <ModalHeader toggle={handleClose}>
                    Confirm
            </ModalHeader>

            <ModalBody>
                <h5>Are you sure you want to delete this task?</h5>
                
            </ModalBody>
            <ModalFooter>
                <Button color='danger' outline onClick={handleClose}>
                    No
                </Button>
                <Button onClick={handleSubmit} color='primary' >
                    Yes
                </Button>
            </ModalFooter>
        </Modal>

    )
}
export default ModalBasic
