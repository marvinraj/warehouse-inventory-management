import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const OutboundContent = () => {
    
    const [outbounds, setOutbounds] = useState([])

    // fetch all outbounds
    useEffect(() => {
        const fetchAllOutbounds = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/outbound/")
                setOutbounds(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllOutbounds()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:5000/api/outbound/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* outbound content */}
            <div className='outbound-content ml-64 px-8 mt-5'>
                {/* outbound title */}
                <h1 className='text-2xl font-bold'>SALES</h1>
                <div className="search-bar add-button flex justify-between">
                    <h3>search bar</h3>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'><Link to="/addoutbound">Add New Outbound</Link></button>
                </div>
                {/* outbound items */}
                <div className="outbounds mt-5">
                    <table className='w-full text-sm text-left rtl:text-right text-gray-800'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                                <th scope="col" class="px-6 py-3">ID</th>
                                <th scope="col" class="px-6 py-3">Product ID</th>
                                <th scope="col" class="px-6 py-3">Product Name</th>
                                <th scope="col" class="px-6 py-3">Customer</th>
                                <th scope="col" class="px-6 py-3">Quantity</th>
                                <th scope="col" class="px-6 py-3">Date Shipped</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outbounds.map((outbound) => (
                                <tr class="bg-white border-b" key={outbound.id}>
                                    <td className='px-6 py-2'>{outbound.id}</td>
                                    <td className='px-6 py-2'>{outbound.product_id}</td>
                                    <td className='px-6 py-2'>{outbound.product_name}</td>
                                    <td className='px-6 py-2'>{outbound.customer}</td>
                                    <td className='px-6 py-2'>{outbound.quantity}</td>
                                    <td className='px-6 py-2'>{outbound.date_shipped}</td>
                                    <td className='px-6 py-2'>
                                        <button onClick={() => handleDelete(outbound.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-thin rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={`/editoutbound/${outbound.id}`}>Edit</Link></button>
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

export default OutboundContent