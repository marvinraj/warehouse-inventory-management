import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
import { formatDate } from '../utility/utils';

const OutboundContent = () => {
    const [outbounds, setOutbounds] = useState([])
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [outboundsToDelete, setOutboundsToDelete] = useState(null);

    // fetch all outbounds
    useEffect(() => {
        const fetchAllOutbounds = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/outbound/?search=${search}`)
                setOutbounds(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllOutbounds()
    }, [search])

    // handle delete product
    const handleDelete = async (id) => {
        try{
            console.log(`Deleting outbounds with ID: ${outboundsToDelete}`);
            await axios.delete(`http://localhost:5000/api/outbound/${outboundsToDelete}`);
            setShowModal(false); // close the modal
            setOutboundsToDelete(null); // reset the product ID
            // reload the products list after deletion
            const res = await axios.get(`http://localhost:5000/api/outbound/?search=${search}`);
            setOutbounds(res.data);
            console.log('Updated outbounds after delete:', res.data);
        } catch(err){
            console.log(err)
        }
    }

    // handle delete click (open modal)
    const handleDeleteClick = (id) => {
        setOutboundsToDelete(id); // set the product to delete
        setShowModal(true); // show the modal
    };

    // handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* outbound content */}
            <div className='outbound-content ml-64 px-8 mt-5'>
                {/* outbound title */}
                <h1 className='text-2xl font-bold'>SALES</h1>
                <div className="search-bar add-button flex justify-between mt-4">
                <div className='w-1/2 flex justify-end items-center relative'>
                        <input type="text" onChange={handleSearchChange} placeholder="Search by product name, or customer" name='product_id' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="absolute mr-2 w-5 text-slate-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <button className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'><Link to="/addoutbound">Add New Outbound</Link></button>
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
                                    <td className='px-6 py-2'>{formatDate(outbound.date_shipped)}</td>
                                    <td className='px-6 py-2'>
                                        <button onClick={() => handleDeleteClick(outbound.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button type="button" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-green-300 font-thin rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={`/editoutbound/${outbound.id}`}>Edit</Link></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <ConfirmationModal
                showModal={showModal}
                setShowModal={setShowModal}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export default OutboundContent