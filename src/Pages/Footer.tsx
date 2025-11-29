import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Section */}
        <h2 className="text-lg font-semibold mb-3 md:mb-0">
          © {new Date().getFullYear()} Your crytotec. All rights reserved.
        </h2>

        {/* Social Icons */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/crytotec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaGithub size={22} />
          </a>

          <a
            href="https://linkedin.com/in/seyioladimeji790"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaLinkedin size={22} />
          </a>

          <a
            href="https://twitter.com/crytotec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaTwitter size={22} />
          </a>

          <a
            href="mailto:seyioladimeji790@gmail.com"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaEnvelope size={22} />
          </a>
        </div>
      </div>

      {/* Back to Top */}
      <div className="text-center mt-6">
        <a
          href="#top"
          className="text-sm text-white hover:text-gray-300 transition duration-300"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
