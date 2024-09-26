import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [isStudentsDropdownOpen, setStudentsDropdownOpen] = useState(false);
    const [isCoursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const [isFeesDropdownOpen, setFeesDropdownOpen] = useState(false);
    const [isPaymentsDropdownOpen, setPaymentsDropdownOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex space-x-4 text-white">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className="relative">
                    <button 
                        onClick={() => setStudentsDropdownOpen(!isStudentsDropdownOpen)} 
                        className="focus:outline-none"
                    >
                        Students
                    </button>
                    {isStudentsDropdownOpen && (
                        <ul className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/addstudent">Add Student</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/managestudent">Manage Students</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="relative">
                    <button 
                        onClick={() => setCoursesDropdownOpen(!isCoursesDropdownOpen)} 
                        className="focus:outline-none"
                    >
                        Courses
                    </button>
                    {isCoursesDropdownOpen && (
                        <ul className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/addcourse">Add Course</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/managecourse">Manage Courses</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="relative">
                    <button 
                        onClick={() => setFeesDropdownOpen(!isFeesDropdownOpen)} 
                        className="focus:outline-none"
                    >
                        Fees
                    </button>
                    {isFeesDropdownOpen && (
                        <ul className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/addfee">Add Fee</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/managefee">Manage Fees</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="relative">
                    <button 
                        onClick={() => setPaymentsDropdownOpen(!isPaymentsDropdownOpen)} 
                        className="focus:outline-none"
                    >
                        Payments
                    </button>
                    {isPaymentsDropdownOpen && (
                        <ul className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/addpayment">Add Payment</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/managepayment">Manage Payments</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;
