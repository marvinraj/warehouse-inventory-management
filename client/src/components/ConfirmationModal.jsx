import React from 'react';

const ConfirmationModal = ({ showModal, setShowModal, onConfirm }) => {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold">Are you sure you want to delete this product?</h2>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={onConfirm} // Trigger the confirm callback
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setShowModal(false)} // Close the modal
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmationModal;
