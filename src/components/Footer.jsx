import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="mx-4 sm:mx-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              We are dedicated to providing the best healthcare services and connecting patients with qualified doctors.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/all-doctors" className="text-gray-300 hover:text-white">Find Doctors</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                              
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: vadaparthisubhash@gmail.com</li>
              <li>Phone: +91 6281949783</li>
              <li>Address: KL University,Vijayawada</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Healthcare Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
