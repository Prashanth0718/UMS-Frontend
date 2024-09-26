import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} All rights reserved by Group No5-6CSE5</p>
            </div>
        </footer>
    );
}

export default Footer;
