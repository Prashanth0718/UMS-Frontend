import React, { useState } from 'react';
import axios from 'axios';

function AddFee() {
    const [feeData, setFeeData] = useState({
        feeID: '',
        courseID: '',
        amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeData({
            ...feeData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/fees', feeData);
            console.log('Fee added:', response.data);
            // Clear the form after successful submission
            setFeeData({
                feeID: '',
                courseID: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error adding fee:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add Fee</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feeID">
                        Fee ID
                    </label>
                    <input
                        type="text"
                        id="feeID"
                        name="feeID"
                        value={feeData.feeID}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseID">
                        Course ID
                    </label>
                    <input
                        type="text"
                        id="courseID"
                        name="courseID"
                        value={feeData.courseID}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={feeData.amount}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Fee
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddFee;
