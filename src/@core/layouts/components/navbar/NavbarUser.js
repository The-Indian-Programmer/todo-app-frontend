// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

const NavbarUser = props => {
  // ** Props

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
