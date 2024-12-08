import React from 'react';

const MessageModal = ({ show, title, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-4 text-gray-700">{message}</p>
                <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
