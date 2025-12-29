import React from 'react'

const CustomerProducts = () => {
  return (
    <div>
        <div className='py-4 px-6'>
          <h2 className='font-bold text-xl'>Products</h2>
        </div>
        
        <div className='py-4 px-6 flex justify-between items-center'>
          <div>
            select
          </div>
          <div>
            <input type="text" placeholder='search' className='p-2 border rounded'/>
          </div>
        </div>
    </div>
  )
}

export default CustomerProducts


