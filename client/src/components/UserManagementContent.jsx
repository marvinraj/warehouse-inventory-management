import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import UserModal from './UsersModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'operator' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/?search=${search}`);
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [search]);

    // to handle search for user in search bar
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // to open modal
    const openModal = (type, user = null) => {
        setModalType(type);
        setShowModal(true);
        if (type === 'edit' && user) {
            setSelectedUser(user);
            setNewUser({ username: user.username, role: user.role, password: '' });
        } else {
            setNewUser({ username: '', password: '', role: 'operator' });
        }
    };

    // to close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    // handle submit add user form
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === 'add') {
                await axios.post('http://localhost:5000/api/users', newUser);
                alert('User added successfully!');
            } else if (modalType === 'edit') {
                await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, newUser);
                alert('User updated successfully!');
            }
            setShowModal(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    // handle delete user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            alert('User deleted successfully!');
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* navbar */}
            <Navbar />
            {/* users content */}
            <div className="user-management-content ml-64 px-8 mt-5">
                {/* users title */}
                <h1 className="text-2xl font-bold">USER MANAGEMENT</h1>
                <div className="search-bar add-button flex justify-between mt-4">
                    {/* search bar */}
                    <div className="w-1/2 flex justify-end items-center relative">
                        <input type="text" onChange={handleSearchChange} placeholder="Search by username or role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"/>
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
                    {/* add user button */}
                    <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5" onClick={() => openModal('add')}>
                        Add New User
                    </button>
                </div>
                {/* users in table */}
                <div className="users mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-800">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr className="bg-white border-b" key={user.id}>
                                    <td className="px-6 py-2">{user.id}</td>
                                    <td className="px-6 py-2">{user.username}</td>
                                    <td className="px-6 py-2">{user.role}</td>
                                    <td className="px-6 py-2">
                                        <button onClick={() => openModal('edit', user)} className="text-white bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg text-xs px-5 py-2 me-2 mb-2">Edit</button>
                                        <button onClick={() => handleDelete(user.id)} className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg text-xs px-4 py-2 me-2 mb-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* modal */}
            {showModal && (
                <UserModal modalType={modalType} newUser={newUser} setNewUser={setNewUser} onClose={closeModal} onSubmit={handleFormSubmit} />
            )}
        </div>
    );
};

export default UserManagement;