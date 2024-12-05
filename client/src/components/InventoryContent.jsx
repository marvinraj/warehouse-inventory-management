import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const InventoryContent = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/inventory")
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
            <Navbar/>
            <div className='inventory-content ml-64 px-8 mt-5'>
                {/* inventory title */}
                <h1 className='text-2xl font-bold'>INVENTORY</h1>
                <div className="search-bar add-button flex justify-between">
                    <h3>search bar</h3>
                    <button className='text-sm bg-gray-400 p-2 rounded-lg'>Add New Product</button>
                </div>
                {/* inventory items */}
                <div className="products">
                    <table>
                        <tr>
                            <th>product id</th>
                            <th>product name</th>
                            <th>description</th>
                            <th>quantity</th>
                            <th>category</th>
                            <th>price</th>
                        </tr>
                    </table>
                    {products.map(product => (
                        <div className="product">
                            <table>
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                </tr>
                            </table>
                            {/* <span>{product.id}</span>
                            <span>{product.name}</span>
                            <span>{product.description}</span>
                            <span>{product.quantity}</span>
                            <span>{product.category}</span>
                            <span>{product.price}</span> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InventoryContent