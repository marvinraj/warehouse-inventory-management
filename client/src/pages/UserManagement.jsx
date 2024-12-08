import React from 'react'
import Sidebar from '../components/Sidebar'
import UserManagementContent from '../components/UserManagementContent'

const UserManagement = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <UserManagementContent/>
        </div>
    </section>
  )
}

export default UserManagement;