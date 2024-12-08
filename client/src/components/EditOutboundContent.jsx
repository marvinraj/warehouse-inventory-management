import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { formatDate } from '../utility/utils';

const EditOutboundContent = () => {
    const [outbound, setOutbound] = useState({
        product_id: "",
        product_name: "",
        customer: "",
        quantity: null,
        date_shipped: "",
    });

    const navigate = useNavigate()
    const location = useLocation()
    const outboundID = location.pathname.split("/")[2]

    // handle change in value
    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'date_shipped' ? formatDate(value) : value;

        setOutbound((prev) => ({ ...prev, [name]: formattedValue }));
    };

    // handles adding outBound button
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.put("http://localhost:5000/api/outbound/"+outboundID, outbound);
            console.log(outbound)
            navigate("/outbound")
        }catch(err) {
            console.log("error in handleClick lol")
        }
    };

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* add outBound form content */}
            <div className='addoutBound-content ml-64 px-8 mt-5'>
                {/* title */}
                <h1 className='text-2xl font-bold'>EDIT SALE</h1>
                <p className='text-xs mt-1 mb-5'>Let's update this sale!</p>
                {/* add mx-auto to center it */}
                {/* form */}
                <form class="max-w-sm"> 
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product ID</label>
                        <input type="text" placeholder="type in name" onChange={handleChange} name='product_id' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                        <input type="text" placeholder="type in description" onChange={handleChange} name='product_name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Customer</label>
                        <input type="text" placeholder="type in quantity" onChange={handleChange} name='customer' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input type="number" placeholder="type in category" onChange={handleChange} name='quantity' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Date Shipped</label>
                        <input type="date" placeholder="type in title" onChange={handleChange} name='date_shipped' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    {/* button */}
                    <button class="mr-2 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"><Link to="/outbound">Cancel</Link></button>
                    <button onClick={handleClick} class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditOutboundContent;