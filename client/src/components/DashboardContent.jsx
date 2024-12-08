import React from 'react'
import Navbar from './Navbar'

const DashboardContent = () => {
  return (
    <div>
        <Navbar/>
        <div className='dashboard-content ml-64 px-8 mt-5'>
          <h1 className='text-2xl font-bold'>Welcome back, Marvin!</h1>
          <p className='text-xs mt-3'>Let's check on the warehouse.</p>
        </div>
    </div>
  )
}

export default DashboardContent