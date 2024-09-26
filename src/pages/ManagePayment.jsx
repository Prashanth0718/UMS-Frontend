import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagePayment() {
    const [payments, setPayments] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editPayment, setEditPayment] = useState({
        paymentID: '',
        studentID: '',
        feeID: '',
        amount: '',
        paymentDate: ''
    });

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8083/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handleDelete = async (paymentID) => {
        try {
            await axios.delete(`http://localhost:8083/payments/${paymentID}`);
            fetchPayments();  // Refresh payments list
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditPayment(payments[index]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPayment({
            ...editPayment,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8083/payments/${editPayment.paymentID}`, editPayment);
            setEditIndex(-1);
            fetchPayments();  // Refresh payments list
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Payments</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Payment ID</th>
                        <th className="py-2 px-4 border-b">Student ID</th>
                        <th className="py-2 px-4 border-b">Fee ID</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Payment Date</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments?.map((payment, index) => (
                        <tr key={payment.paymentID}>
                            {editIndex === index ? (
                                <>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="paymentID"
                                            value={editPayment.paymentID}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                            readOnly
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="studentID"
                                            value={editPayment.studentID}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="feeID"
                                            value={editPayment.feeID}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="number"
                                            name="amount"
                                            value={editPayment.amount}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="date"
                                            name="paymentDate"
                                            value={editPayment.paymentDate}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditIndex(-1)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-4 border-b">{payment.paymentID}</td>
                                    <td className="py-2 px-4 border-b">{payment.studentID}</td>
                                    <td className="py-2 px-4 border-b">{payment.feeID}</td>
                                    <td className="py-2 px-4 border-b">{payment.amount}</td>
                                    <td className="py-2 px-4 border-b">{payment.paymentDate}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(payment.paymentID)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagePayment;
