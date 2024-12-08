import React from 'react';

const RestrictedModal = ({ show, onClose, message }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Restricted Action</h2>
                <p className="mb-4">{message || "You are not allowed to perform this action."}</p>
                <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Close
                </button>
            </div>
        </div>
    );
};

export default RestrictedModal;
