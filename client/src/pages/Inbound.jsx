import React from 'react'
import Sidebar from '../components/Sidebar'
import InboundContent from '../components/InboundContent'

const Inbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <InboundContent/>
        </div>
    </section>
  )
}

export default Inbound;