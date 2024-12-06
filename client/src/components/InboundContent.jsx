import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const InboundContent = () => {
    
    const [purchases, setPurchases] = useState([])

    // fetch all purchases
    useEffect(() => {
        const fetchAllPurchases = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/inbound/")
                setPurchases(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllPurchases()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:5000/api/inbound/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* inbound content */}
            <div className='inventory-content ml-64 px-8 mt-5'>
                {/* inbound title */}
                <h1 className='text-2xl font-bold'>PURCHASES</h1>
                <div className="search-bar add-button flex justify-between">
                    <h3>search bar</h3>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'><Link to="/addpurchase">Add New Inbound</Link></button>
                </div>
                {/* inbound items */}
                <div className="purchases mt-5">
                    <table className='w-full text-sm text-left rtl:text-right text-gray-800'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                                <th scope="col" class="px-6 py-3">ID</th>
                                <th scope="col" class="px-6 py-3">Product ID</th>
                                <th scope="col" class="px-6 py-3">Product Name</th>
                                <th scope="col" class="px-6 py-3">Supplier</th>
                                <th scope="col" class="px-6 py-3">Quantity</th>
                                <th scope="col" class="px-6 py-3">Date Received</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase) => (
                                <tr class="bg-white border-b" key={purchase.id}>
                                    <td className='px-6 py-2'>{purchase.id}</td>
                                    <td className='px-6 py-2'>{purchase.product_id}</td>
                                    <td className='px-6 py-2'>{purchase.product_name}</td>
                                    <td className='px-6 py-2'>{purchase.supplier}</td>
                                    <td className='px-6 py-2'>{purchase.quantity}</td>
                                    <td className='px-6 py-2'>{purchase.date_received}</td>
                                    <td className='px-6 py-2'>
                                        <button onClick={() => handleDelete(purchase.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-thin rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={`/editpurchase/${purchase.id}`}>Edit</Link></button>
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

export default InboundContent