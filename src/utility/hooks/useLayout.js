//** React Imports
// import { useEffect, useCallback } from 'react'

// ** Store Imports
import {  useSelector } from 'react-redux'

export const useLayout = () => {
  // ** Hooks
  const store = useSelector(state => state.layout)

  return { layout: '', lastLayout: '' }
}
