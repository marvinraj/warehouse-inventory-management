import React from 'react'
import Sidebar from '../components/Sidebar'
import AddProductContent from '../components/AddProductContent'

const AddProduct = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <AddProductContent/>
        </div>
    </section>
  )
}

export default AddProduct;