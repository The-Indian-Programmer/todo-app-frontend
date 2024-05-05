import { Fragment } from 'react'

const ToastContent = ({ status, message }) => {

    const toastStatus =( status === 'success') ? 'Success' : 'Error';


    return (<Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <h6 className='toast-title fw-bold'>{toastStatus}</h6>
        </div>
      </div>
      <div className='ms-1'>
        <span>{message}</span>
      </div>
    </Fragment>
  )
}

export default ToastContent