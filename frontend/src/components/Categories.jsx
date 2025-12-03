import React from 'react'

const Categories = () => {
  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold mb-8'>Category Management</h1>

        <div className='flex flex-col lg:flex-row gap-4'>
            <div>
                <h2>Add Category</h2>
                <form >
                    <input type="text" placeholder='Category Name' />
                    <input type="text" placeholder='Category Description' />
                    <button type="submit">Add Category</button>
                </form>
            </div>

            <div>

            </div>
        </div>
    </div>
  )
}

export default Categories