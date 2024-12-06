import React from 'react'
import Sidebar from '../components/Sidebar'
import EditInboundContent from '../components/EditInboundContent'

const EditInbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <EditInboundContent/>
        </div>
    </section>
  )
}

export default EditInbound;