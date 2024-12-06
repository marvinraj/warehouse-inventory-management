import React from 'react'
import Sidebar from '../components/Sidebar'
import OutboundContent from '../components/OutboundContent'

const Outbound = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <OutboundContent/>
        </div>
    </section>
  )
}

export default Outbound;