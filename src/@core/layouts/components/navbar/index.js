// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import { useHistory } from 'react-router-dom'

const ThemeNavbar = props => {
  const history = useHistory()
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div  className='bookmark-wrapper d-flex align-items-center'>
         <h3 role='button' onClick={() => history.push('/dashboard')}>Task Manager</h3>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
