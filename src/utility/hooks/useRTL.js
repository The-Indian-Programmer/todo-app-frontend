//** React Imports
import { useEffect } from 'react'


export const useRTL = () => {
  // ** Store Vars


  useEffect(() => {
    // ** Get HTML Tag
    const element = document.getElementsByTagName('html')[0]

      element.setAttribute('dir', 'ltr')
  }, [])

  return []
}
