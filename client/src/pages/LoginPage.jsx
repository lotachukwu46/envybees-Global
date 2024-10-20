import React, { useState } from "react";
import { Mail, Lock, LogInIcon, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const inputVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 },
};

const InputField = ({ id, type, placeholder, icon: Icon, value, onChange }) => (
  <motion.div
    className="mt-4 relative rounded-md shadow-sm"
    initial="initial"
    animate="animate"
    variants={inputVariants}
  >
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input
      id={id}
      required
      value={value}
      type={type}
      onChange={onChange}
      className="block w-full px-3 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition"
      placeholder={placeholder}
    />
  </motion.div>
);

const LoginPage = () => {
  const { loading, login } = useUserStore();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex flex-col justify-center py-12 px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Log in your account
        </h1>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <InputField
              id="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            {/* Password */}
            <InputField
              id="password"
              type="password"
              placeholder="**********"
              icon={Lock}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <LogInIcon className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{"  "}
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition"
              disabled={loading}
            >
              Sign Up here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
