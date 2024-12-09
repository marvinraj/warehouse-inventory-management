import React from 'react'
import BottomNav from '../components/BottomNav'

const LandingPage = () => {
  return (
    <div className='bg-stone-900 h-screen text-gray-300'>
        <h3 className='landing-text'>Looking for a better way to manage your warehouse? <span className='text-indigo-600 block text-center text-2xl'>Look no further.</span></h3>
        <BottomNav/>
    </div>
  )
}

export default LandingPage