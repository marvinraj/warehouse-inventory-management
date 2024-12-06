import React from 'react'
import Sidebar from '../components/Sidebar'
import AddOutboundContent from '../components/AddOutboundContent'

const AddOutbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <AddOutboundContent/>
        </div>
    </section>
  )
}

export default AddOutbound;