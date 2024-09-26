import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageCourse() {
    const [courses, setCourses] = useState([]);
    const [editCourseID, setEditCourseID] = useState(null);
    const [editCourseData, setEditCourseData] = useState({
        courseID: '',
        courseName: '',
        description: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8083/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDelete = async (courseID) => {
        try {
            await axios.delete(`http://localhost:8083/courses/${courseID}`);
            fetchCourses(); // Refresh the course list after deletion
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditClick = (course) => {
        setEditCourseID(course.courseID);
        setEditCourseData(course);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditCourseData({
            ...editCourseData,
            [name]: value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8083/courses/${editCourseID}`, editCourseData);
            setEditCourseID(null);
            fetchCourses(); // Refresh the course list after update
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course ID
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courses?.map((course) => (
                        <tr key={course.courseID}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editCourseID === course.courseID ? (
                                    <input
                                        type="text"
                                        name="courseID"
                                        value={editCourseData.courseID}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border rounded"
                                        readOnly
                                    />
                                ) : (
                                    course.courseID
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editCourseID === course.courseID ? (
                                    <input
                                        type="text"
                                        name="courseName"
                                        value={editCourseData.courseName}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                ) : (
                                    course.courseName
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editCourseID === course.courseID ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={editCourseData.description}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                ) : (
                                    course.description
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {editCourseID === course.courseID ? (
                                    <button
                                        onClick={handleEditSubmit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(course)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.courseID)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default ManageCourse;
