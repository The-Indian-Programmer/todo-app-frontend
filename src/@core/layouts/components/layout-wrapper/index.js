// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Styles
import 'animate.css/animate.css'

const LayoutWrapper = props => {
  // ** Props
  const { layout, children, appLayout, wrapperClass, transition } = props

  // ** Store Vars

  const contentWidth = 'boxed'

  //** Vars
  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment



  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [wrapperClass]: wrapperClass,
        'show-overlay': 1,
      })}
    >
      <div className='header-navbar-shadow' />
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          ' p-0': contentWidth === 'boxed',
          [`animate__animated animate__fadeIn`]: 'fadeIn',
        })}
      >
        <Tag
          /*eslint-disable */
          {...(layout === 'HorizontalLayout' && !appLayout
            ? { className: classnames({ 'content-body': !appLayout }) }
            : {})}
          /*eslint-enable */
        >
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default LayoutWrapper
