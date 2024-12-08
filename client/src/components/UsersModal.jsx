import React from 'react';

const UserModal = ({ modalType, newUser, setNewUser, onClose, onSubmit }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">
                    {modalType === 'add' ? 'Add New User' : 'Edit User'}
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                    </div>
                    {modalType === 'add' && (
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" >
                            <option value="operator">Operator</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Cancel</button>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                            {modalType === 'add' ? 'Add User' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;



