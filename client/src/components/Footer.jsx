import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import Lucide icons
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-gray-300 py-10 mt-20 relative z-50"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
        {/* Footer Links */}
        <div className="flex space-x-5">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="hover:text-emerald-400 transition"
          >
            <Facebook size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="hover:text-emerald-400 transition"
          >
            <Twitter size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="hover:text-emerald-400 transition"
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="hover:text-emerald-400 transition"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Envybees Global. All rights reserved.
        </p>

        {/* Link to Portfolio */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-sm text-gray-400 hover:text-emerald-400 transition"
        >
          <Link to="#">Credit: Lotachukwu</Link>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
