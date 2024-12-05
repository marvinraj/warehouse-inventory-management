import React from 'react'
import Sidebar from '../components/Sidebar'
import InventoryContent from '../components/InventoryContent'

const Inventory = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <InventoryContent/>
        </div>
    </section>
  )
}

export default Inventory