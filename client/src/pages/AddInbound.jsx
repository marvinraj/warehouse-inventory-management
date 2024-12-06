import React from 'react'
import Sidebar from '../components/Sidebar'
import AddInboundContent from '../components/AddInboundContent'

const AddInbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <AddInboundContent/>
        </div>
    </section>
  )
}

export default AddInbound;