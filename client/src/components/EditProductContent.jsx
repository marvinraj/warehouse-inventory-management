import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const EditProductContent = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        quantity: null,
        category: "",
        price: null,
    });

    const navigate = useNavigate()
    const location = useLocation()
    const productID = location.pathname.split("/")[2]

    // handle change in value
    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handles adding product button
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.put("http://localhost:5000/api/inventory/"+productID, product);
            console.log("DONE POST " + product.title)
            navigate("/inventory")
        }catch(err) {
            console.log("error in handleClick lol")
        }
    };

    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* add product form content */}
            <div className='addproduct-content ml-64 px-8 mt-5'>
                {/* title */}
                <h1 className='text-2xl font-bold'>EDIT PRODUCT</h1>
                <p className='text-xs mt-1 mb-5'>Let's update this product!</p>
                {/* add mx-auto to center it */}
                {/* form */}
                <form class="max-w-sm"> 
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                        <input type="text" placeholder="type in name" onChange={handleChange} name='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product Description</label>
                        <input type="text" placeholder="type in description" onChange={handleChange} name='description' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                        <input type="number" placeholder="type in quantity" onChange={handleChange} name='quantity' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input type="text" placeholder="type in category" onChange={handleChange} name='category' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "/>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input type="number" placeholder="type in title" onChange={handleChange} name='price' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "/>
                    </div>
                    {/* button */}
                    <button class="mr-2 text-white bg-red-700 hover:bg-RED-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"><Link to="/inventory">Cancel</Link></button>
                    <button onClick={handleClick} class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditProductContent;