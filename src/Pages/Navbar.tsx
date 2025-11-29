import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom"; // 👈 import Link

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, path: "/", name: "home" },
    { id: 2, path: "/about", name: "about" },
    { id: 4, path: "/education", name: "education" },
    { id: 5, path: "/contact", name: "contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 shadow-md">
      <div className="w-[80%] mx-auto flex justify-between items-center h-16 px-6 text-white">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-blue-200">Seyi</span>Dev
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8">
          {links.map(({ id, path, name }) => (
            <li
              key={id}
              className="capitalize font-medium cursor-pointer hover:text-gray-200 transition duration-300"
            >
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-2 z-50 md:hidden"
        >
          {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>

        {/* Mobile Menu */}
        {nav && (
          <ul className="absolute top-16 left-0 w-full bg-gradient-to-b from-blue-800 to-blue-500 flex flex-col items-center space-y-6 py-6 text-lg md:hidden">
            {links.map(({ id, path, name }) => (
              <li key={id} className="capitalize font-medium">
                <Link
                  to={path}
                  onClick={() => setNav(false)}
                  className="hover:text-gray-200 transition duration-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
