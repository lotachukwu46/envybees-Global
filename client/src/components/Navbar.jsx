import React, { useState } from "react";
import {
  ShoppingCart,
  HomeIcon,
  UserPlus,
  Lock,
  LogInIcon,
  LogOutIcon,
  Menu,
  X,
  ClipboardCheck,
} from "lucide-react"; // Add necessary Lucide icons here
import logo from "../../public/logo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";
  const { cart } = useCartStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }} // Animate from the left
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex items-center"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-bold text-emerald-400 flex items-center space-x-2"
            >
              <img src={logo} alt="Logo" className="inline-block h-10 w-10" />
              <span>Envybees Global</span>
            </Link>
          </motion.div>

          {/* Hamburger Menu for Mobile */}
          <button className="md:hidden text-emerald-400" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right: Navigation Links */}
          <motion.nav
            initial={{ x: 100, opacity: 0 }} // Animate from the right
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="hidden md:flex items-center gap-4"
          >
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              <HomeIcon className="inline-block mr-1" size={20} />
              Home
            </Link>

            {isCustomer && (
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-emerald-400 transition"
              >
                <ClipboardCheck className="inline-block mr-1" size={20} />
                Dashboard
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                className="relative text-gray-300 hover:text-emerald-400 transition"
              >
                <ShoppingCart className="inline-block mr-1" size={20} />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
                onClick={logout}
              >
                <LogOutIcon className="inline-block mr-1" size={18} />
                Log Out
              </motion.button>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center"
                  >
                    <UserPlus className="mr-2" size={18} />
                    Sign Up
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
                  >
                    <LogInIcon className="mr-2" size={18} />
                    Login
                  </Link>
                </motion.div>
              </>
            )}
          </motion.nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }} // Start from above
            animate={{ opacity: 1, y: 0 }} // Animate to its place
            exit={{ opacity: 0, y: -20 }} // Animate out to above
            transition={{ duration: 0.3 }} // Transition duration
            className="md:hidden mt-4 flex flex-col gap-4 items-start"
          >
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition"
              onClick={closeMenu}
            >
              <HomeIcon className="inline-block mr-1" size={20} />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-emerald-400 transition"
              onClick={closeMenu}
            >
              <ClipboardCheck className="inline-block mr-1" size={20} />
              Dashboard
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative text-gray-300 hover:text-emerald-400 transition"
                onClick={closeMenu}
              >
                <ShoppingCart className="inline-block mr-1" size={20} />
                Cart
                <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {cart.length}
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md"
                onClick={closeMenu}
              >
                <Lock className="inline-block mr-1" size={18} />
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <LogOutIcon className="inline-block mr-1" size={18} />
                Log Out
              </motion.button>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md"
                    onClick={closeMenu}
                  >
                    <UserPlus className="mr-2" size={18} />
                    Sign Up
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                    onClick={closeMenu}
                  >
                    <LogInIcon className="mr-2" size={18} />
                    Login
                  </Link>
                </motion.div>
              </>
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
