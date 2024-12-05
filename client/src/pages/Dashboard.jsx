import React from 'react'
import Sidebar from '../components/Sidebar'
import DashboardContent from '../components/DashboardContent'

const Dashboard = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <DashboardContent/>
        </div>
    </section>
  )
}

export default Dashboard