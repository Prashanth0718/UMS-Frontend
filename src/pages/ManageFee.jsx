import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageFee() {
    const [fees, setFees] = useState([]);
    const [editingFeeId, setEditingFeeId] = useState(null);
    const [updatedFee, setUpdatedFee] = useState({
        feeID: '',
        courseID: '',
        amount: ''
    });

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const response = await axios.get('http://localhost:8083/fees');
            setFees(response.data);
        } catch (error) {
            console.error('Error fetching fees:', error);
        }
    };

    const handleDelete = async (feeID) => {
        try {
            await axios.delete(`http://localhost:8083/fees/${feeID}`);
            setFees(fees.filter(fee => fee.feeID !== feeID));
        } catch (error) {
            console.error('Error deleting fee:', error);
        }
    };

    const handleEdit = (fee) => {
        setEditingFeeId(fee.feeID);
        setUpdatedFee(fee);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFee({
            ...updatedFee,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8083/fees/${updatedFee.feeID}`, updatedFee);
            setFees(fees.map(fee => (fee.feeID === updatedFee.feeID ? updatedFee : fee)));
            setEditingFeeId(null);
        } catch (error) {
            console.error('Error updating fee:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Fees</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Fee ID</th>
                        <th className="py-2 px-4 border-b">Course ID</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fees?.map(fee => (
                        <tr key={fee.feeID}>
                            <td className="py-2 px-4 border-b">
                                {editingFeeId === fee.feeID ? (
                                    <input
                                        type="text"
                                        name="feeID"
                                        value={updatedFee.feeID}
                                        onChange={handleUpdateChange}
                                        className="w-full px-2 py-1 border"
                                        disabled
                                    />
                                ) : (
                                    fee.feeID
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingFeeId === fee.feeID ? (
                                    <input
                                        type="text"
                                        name="courseID"
                                        value={updatedFee.courseID}
                                        onChange={handleUpdateChange}
                                        className="w-full px-2 py-1 border"
                                    />
                                ) : (
                                    fee.courseID
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingFeeId === fee.feeID ? (
                                    <input
                                        type="number"
                                        name="amount"
                                        value={updatedFee.amount}
                                        onChange={handleUpdateChange}
                                        className="w-full px-2 py-1 border"
                                    />
                                ) : (
                                    fee.amount
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingFeeId === fee.feeID ? (
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(fee)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(fee.feeID)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageFee;
