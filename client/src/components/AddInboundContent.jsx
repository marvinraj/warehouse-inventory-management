import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { formatDate } from '../utility/utils';

const AddInboundContent = () => {
    const [purchase, setPurchase] = useState({
        product_id: "",
        product_name: "",
        supplier: "",
        quantity: null,
        date_received: "",
    });

    const navigate = useNavigate()

    // handle change in value
    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'date_received' ? formatDate(value) : value;

        setPurchase((prev) => ({ ...prev, [name]: formattedValue }));
    };

    // handles adding purchase button
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/api/inbound/", purchase);
            console.log("DONE POST " + purchase.product_name)
            navigate("/inbound")
        }catch(err) {
            console.log("error in handleClick lol")
        }
    };

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* add purchase form content */}
            <div className='addpurchase-content ml-64 px-8 mt-5'>
                {/* title */}
                <h1 className='text-2xl font-bold'>Add New Purchase</h1>
                <p className='text-xs mt-1 mb-5'>What do you want to add?</p>
                {/* add mx-auto to center it */}
                {/* form */}
                <form class="max-w-sm"> 
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product ID</label>
                        <input type="text" placeholder="type in id" onChange={handleChange} name='product_id' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                        <input type="text" placeholder="type in name" onChange={handleChange} name='product_name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Supplier</label>
                        <input type="text" placeholder="type in supplier" onChange={handleChange} name='supplier' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input type="number" placeholder="type in quantity" onChange={handleChange} name='quantity' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Date Received</label>
                        <input type="date" placeholder="type in date received" onChange={handleChange} name='date_received' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    {/* button */}
                    <button class="mr-2 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"><Link to="/inbound">Cancel</Link></button>
                    <button onClick={handleClick} class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddInboundContent;