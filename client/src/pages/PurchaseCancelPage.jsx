import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-900 rounded-lg shadow-xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 text-center">
              If you encountered any issues during the checkout process, please
              don&apos;t hesitate to contact our support team.
            </p>
            <div className="mt-4">
              <h2 className="text-lg font-bold text-gray-300">
                Contact Information
              </h2>
              <p className="text-gray-400">
                Email:{" "}
                <a
                  href="mailto:lotaodi46@gmail.com"
                  className="text-emerald-400"
                >
                  envybees@gmail.com
                </a>
              </p>
              <p className="text-gray-400">Phone: +234 816 324 8451</p>
              <p className="text-gray-400">
                Address: Shop 38 Lamond Plaza, 15 Langtang Street, Jos, 930105,
                Plateau
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
