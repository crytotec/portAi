import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white py-8 mt-10 rounded-t-3xl shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Section */}
        <h2 className="text-lg font-semibold mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} Crytotec. All rights reserved.
        </h2>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/crytotec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://linkedin.com/in/seyioladimeji790"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>

          <a
            href="https://twitter.com/crytotec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>

          <a
            href="mailto:seyioladimeji790@gmail.com"
            className="hover:text-red-400 transition-colors duration-300"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>

      {/* Back to Top */}
      <div className="text-center mt-6">
        <a
          href="#top"
          className="text-sm text-white hover:text-red-400 transition-colors duration-300"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
