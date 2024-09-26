import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPayment() {
    const [payment, setPayment] = useState({
        paymentID: '',
        studentID: '',
        feeID: '',
        amount: '',
        paymentDate: ''
    });

    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8083/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment({
            ...payment,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentExists = students.some(student => student.studentID === parseInt(payment.studentID));
        if (!studentExists) {
            setError('Student does not exist');
            return;
        }

        try {
            await axios.post('http://localhost:8083/payments', payment);
            // Clear the form after successful submission
            setPayment({
                paymentID: '',
                studentID: '',
                feeID: '',
                amount: '',
                paymentDate: ''
            });
            setError('');
            alert('Payment added successfully');
        } catch (error) {
            console.error('Error adding payment:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add Payment</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentID">
                        Payment ID
                    </label>
                    <input
                        type="text"
                        id="paymentID"
                        name="paymentID"
                        value={payment.paymentID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentID">
                        Student ID
                    </label>
                    <input
                        type="text"
                        id="studentID"
                        name="studentID"
                        value={payment.studentID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feeID">
                        Fee ID
                    </label>
                    <input
                        type="text"
                        id="feeID"
                        name="feeID"
                        value={payment.feeID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
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
                        value={payment.amount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDate">
                        Payment Date
                    </label>
                    <input
                        type="date"
                        id="paymentDate"
                        name="paymentDate"
                        value={payment.paymentDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Payment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPayment;
