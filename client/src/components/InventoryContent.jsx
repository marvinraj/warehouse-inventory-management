import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const InventoryContent = () => {

    const [products, setProducts] = useState([])

    // fetch all products
    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/inventory/")
                setProducts(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])


    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* inventory content */}
            <div className='inventory-content ml-64 px-8 mt-5'>
                {/* inventory title */}
                <h1 className='text-2xl font-bold'>INVENTORY</h1>
                <div className="search-bar add-button flex justify-between">
                    <h3>search bar</h3>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><Link to="/addproduct">Add New Product</Link></button>
                </div>
                {/* inventory items */}
                <div className="products">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                        {products.map((product) => (
                            <tr className="product" key={product.id}>
                                <th className='font-normal'>{product.name}</th>
                                <th className='font-normal'>{product.description}</th>
                                <th className='font-normal'>{product.quantity}</th>
                                <th className='font-normal'>{product.category}</th>
                                <th className='font-normal'>{product.price}</th>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InventoryContent