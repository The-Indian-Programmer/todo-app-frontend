
// ** React Imports
import React from 'react'

const NoTableData = ({ message }) => {
  return (
    <div className='h-50 no-table-data py-5' >
        <img className='no-data-image' src='https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp' alt='No Data Found' />

        <h3 className='mt-2'>{message}</h3>
    </div>
  )
}

export default NoTableData
