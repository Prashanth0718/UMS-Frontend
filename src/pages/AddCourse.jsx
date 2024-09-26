import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
    const [course, setCourse] = useState({
        courseID: '',
        courseName: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/courses', course);
            console.log('Course added successfully:', response.data);
            // Clear form fields after successful submission
            setCourse({
                courseID: '',
                courseName: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseID">
                        Course ID
                    </label>
                    <input
                        type="text"
                        id="courseID"
                        name="courseID"
                        value={course.courseID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        value={course.courseName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Course
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCourse;
