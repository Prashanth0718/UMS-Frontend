import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageStudent() {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [editStudent, setEditStudent] = useState({
        studentID: '',
        name: '',
        email: '',
        phone: ''
    });

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

    const handleDelete = async (studentID) => {
        try {
            await axios.delete(`http://localhost:8083/students/${studentID}`);
            setStudents(students.filter(student => student.studentID !== studentID));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEdit = (student) => {
        setEditStudentId(student.studentID);
        setEditStudent({ ...student });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditStudent({
            ...editStudent,
            [name]: value
        });
    };

    const handleUpdate = async (studentID) => {
        try {
            await axios.put(`http://localhost:8083/students/${studentID}`, editStudent);
            setStudents(students.map(student => (student.studentID === studentID ? editStudent : student)));
            setEditStudentId(null);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student) => (
                        <tr key={student.studentID} className="border-t">
                            {editStudentId === student.studentID ? (
                                <>
                                    <td className="py-2 px-4">
                                        <input
                                            type="text"
                                            name="studentID"
                                            value={editStudent.studentID}
                                            onChange={handleChange}
                                            disabled
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editStudent.name}
                                            onChange={handleChange}
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="email"
                                            name="email"
                                            value={editStudent.email}
                                            onChange={handleChange}
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editStudent.phone}
                                            onChange={handleChange}
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(student.studentID)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditStudentId(null)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-4">{student.studentID}</td>
                                    <td className="py-2 px-4">{student.name}</td>
                                    <td className="py-2 px-4">{student.email}</td>
                                    <td className="py-2 px-4">{student.phone}</td>
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.studentID)}
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

export default ManageStudent;
