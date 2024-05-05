// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
         <h3>Task Manager</h3>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar