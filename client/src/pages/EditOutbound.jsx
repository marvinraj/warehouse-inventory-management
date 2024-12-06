import React from 'react'
import Sidebar from '../components/Sidebar'
import EditOutboundContent from '../components/EditOutboundContent'

const EditOutbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <EditOutboundContent/>
        </div>
    </section>
  )
}

export default EditOutbound;