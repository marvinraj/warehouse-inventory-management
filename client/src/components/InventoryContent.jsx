import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
import RestrictedModal from './RestrictedModal'

const InventoryContent = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [showRestrictedModal, setShowRestrictedModal] = useState(false);
    const [restrictedMessage, setRestrictedMessage] = useState('');
    const [productToDelete, setProductToDelete] = useState(null);
    const role = localStorage.getItem('role');

    // fetch all products
    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/inventory/?search=${search}`)
                setProducts(res.data);
                console.log(res)
            } catch (err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [search])

    // handle delete product
    const handleDelete = async (id) => {
        try{
            console.log(`Deleting product with ID: ${productToDelete}`);
            await axios.delete(`http://localhost:5000/api/inventory/${productToDelete}`);
            setShowModal(false); // close the modal
            setProductToDelete(null); // reset the product ID
            // reload the products list after deletion
            const res = await axios.get(`http://localhost:5000/api/inventory/?search=${search}`);
            setProducts(res.data);
            console.log('Updated Products after delete:', res.data);
        } catch(err){
            console.log(err)
        }
    }

    // handle delete click
    const handleDeleteClick = (id) => {
        if (role === 'operator') {
            setRestrictedMessage('STOP!!! Operators are not allowed to delete products.');
            setShowRestrictedModal(true);
        } else{
            setProductToDelete(id); // set the product to delete
            setShowModal(true); // show the modal   
        }
    };
    // handle edit click
    const handleEditClick = () => {
        if (role === 'operator') {
            setRestrictedMessage('STOP!!! Operators are not allowed to edit products.');
            setShowRestrictedModal(true); // Show restriction modal
        }
    };
    // handle add click
    const handleAddProductClick = (e) => {
        if (role === 'operator') {
            e.preventDefault(); // Prevent navigation
            setRestrictedMessage('STOP!!! Operators are not allowed to add products.');
            setShowRestrictedModal(true); // Show restriction modal
        }
    };

    // handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* inventory content */}
            <div className='inventory-content ml-64 px-8 mt-5'>
                {/* inventory title */}
                <h1 className='text-3xl font-bold'>INVENTORY</h1>
                <div className="search-bar add-button flex justify-between mt-4">
                    {/* search bar */}
                    <div className='w-1/2 flex justify-end items-center relative'>
                        <input type="text" onChange={handleSearchChange} placeholder="Search by name, category, or description" name='product_id' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
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
                    {/* add product button */}
                    <button onClick={handleAddProductClick} className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'><Link to={role !== 'operator' ? `/addproduct` : "#"}>Add New Product</Link></button>
                </div>
                {/* inventory items in table */}
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
                                        <button onClick={() => handleDeleteClick(product.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                        <button onClick={handleEditClick} type="button" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-green-300 font-thin rounded-lg text-xs px-5 py-2 me-2 mb-2"><Link to={role !== 'operator' ? `/editproduct/${product.id}` : "#"}>Edit</Link></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* restricted modal */}
            <RestrictedModal show={showRestrictedModal} onClose={() => setShowRestrictedModal(false)} message={restrictedMessage}/>
            {/* confirmation modal */}
            <ConfirmationModal showModal={showModal} setShowModal={setShowModal} onConfirm={handleDelete}/>
        </div>
    )
}

export default InventoryContent