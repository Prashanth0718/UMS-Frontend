import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
    const [student, setStudent] = useState({
        studentID: '',
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/students', student);
            console.log(response.data);
            alert('Student added successfully!');
            setStudent({ studentID: '', name: '', email: '', phone: '' });
        } catch (error) {
            console.error(error);
            alert('Error adding student.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add Student</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded">
                <div className="mb-4">
                    <label htmlFor="studentID" className="block text-gray-700 font-bold mb-2">Student ID</label>
                    <input
                        type="text"
                        id="studentID"
                        name="studentID"
                        value={student.studentID}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddStudent;
