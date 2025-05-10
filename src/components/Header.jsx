import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { isAuthenticated, getCurrentUser, signOut } from "../utils/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();
  const isHomePage = location.pathname === '/';

  const handleBookAppointment = () => {
    navigate("/doctors");
  };

  const handleViewAllDoctors = () => {
    navigate("/all-doctors");
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src={assets.logo} alt="Healthcare Logo" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/all-doctors" className="text-gray-700 hover:text-blue-600">
                All Doctors
              </Link>
              
              {isAuthenticated() ? (
                <>
                  <Link
                    to={`/${currentUser.type}/dashboard`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                <img
                  src={assets.menu_icon}
                  alt="Menu"
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link to="/all-doctors" className="text-gray-700 hover:text-blue-600">
                  All Doctors
                </Link>
                <Link to="/contact-us" className="text-gray-700 hover:text-blue-600">
                  Contact Us
                </Link>
                {isAuthenticated() ? (
                  <>
                    <Link
                      to={`/${currentUser.type}/dashboard`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 hover:text-blue-600 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="text-gray-700 hover:text-blue-600">
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

</>
  )
};

export default Header;
