import React from 'react'
import Sidebar from '../components/Sidebar'
import EditProductContent from '../components/EditProductContent'

const EditProduct = () => {
  return (
    <section className='dashboard'>
        <div>
            <Sidebar/>
            <EditProductContent/>
        </div>
    </section>
  )
}

export default EditProduct;