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

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:5000/api/inventory/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }


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
                <div className="products mt-5">
                    <table className='w-full text-sm text-left rtl:text-right text-gray-800'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                                <th scope="col" class="px-6 py-3">ID</th>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">Description</th>
                                <th scope="col" class="px-6 py-3">Quantity</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                                <th scope='col' class='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr class="bg-white border-b" key={product.id}>
                                    <td className='px-6 py-2'>{product.id}</td>
                                    <td className='px-6 py-2'>{product.name}</td>
                                    <td className='px-6 py-2'>{product.description}</td>
                                    <td className='px-6 py-2'>{product.quantity}</td>
                                    <td className='px-6 py-2'>{product.category}</td>
                                    <td className='px-6 py-2'>{product.price}</td>
                                    <td className='px-6 py-2'>
                                        <button onClick={() => handleDelete(product.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={`/editproduct/${product.id}`}>Edit</Link></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InventoryContent