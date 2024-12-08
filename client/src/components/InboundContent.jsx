import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'

const InboundContent = () => {
    
    const [purchases, setPurchases] = useState([])
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [purchasesToDelete, setPurchasesToDelete] = useState(null);

    // fetch all purchases
    useEffect(() => {
        const fetchAllPurchases = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/inbound/?search=${search}`)
                setPurchases(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllPurchases()
    }, [search])

    // handle delete product
    const handleDelete = async (id) => {
        try{
            console.log(`Deleting purchases with ID: ${purchasesToDelete}`);
            await axios.delete(`http://localhost:5000/api/inbound/${purchasesToDelete}`);
            setShowModal(false); // close the modal
            setPurchasesToDelete(null); // reset the product ID
            // reload the products list after deletion
            const res = await axios.get(`http://localhost:5000/api/inbound/?search=${search}`);
            setPurchases(res.data);
            console.log('Updated purchases after delete:', res.data);
        } catch(err){
            console.log(err)
        }
    }

    // handle delete click (open modal)
    const handleDeleteClick = (id) => {
        setPurchasesToDelete(id); // set the product to delete
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
            {/* inbound content */}
            <div className='inventory-content ml-64 px-8 mt-5'>
                {/* inbound title */}
                <h1 className='text-3xl font-bold'>PURCHASES</h1>
                <div className="search-bar add-button flex justify-between mt-4">
                    <div className='w-1/2 flex justify-end items-center relative'>
                        <input type="text" onChange={handleSearchChange} placeholder="Search by product name, or supplier" name='product_id' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
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
                    <button className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'><Link to="/addpurchase">Add New Inbound</Link></button>
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
                                        <button onClick={() => handleDeleteClick(purchase.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button type="button" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-green-300 font-thin rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={`/editpurchase/${purchase.id}`}>Edit</Link></button>
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

export default InboundContent