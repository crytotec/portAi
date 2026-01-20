import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, href: "#hero", name: "home" },
    { id: 2, href: "#about", name: "about" },
    { id: 3, href: "#education", name: "education" },
    { id: 4, href: "#projects", name: "projects" },
    { id: 5, href: "#contact", name: "contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setNav(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed w-full h-16 top-0 z-50 bg-gray-900 shadow-md">
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center h-16 px-6 text-white">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-purple-400">Cryto</span>TEC
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8">
          {links.map(({ id, href, name }) => (
            <li key={id} className="capitalize font-medium cursor-pointer hover:text-purple-400 transition duration-300">
              <a href={href} onClick={(e) => handleScroll(e, href)}>
                {name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div onClick={() => setNav(!nav)} className="cursor-pointer z-50 md:hidden">
          {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 z-40 md:hidden ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-6">
            <h1 className="text-2xl font-bold tracking-wide text-purple-400">CrytoTEC</h1>
            <div onClick={() => setNav(false)} className="cursor-pointer">
              <FaTimes size={25} />
            </div>
          </div>
          <ul className="flex flex-col gap-6 mt-10 px-6 text-lg">
            {links.map(({ id, href, name }) => (
              <li key={id} className="capitalize font-medium">
                <a
                  href={href}
                  onClick={(e) => handleScroll(e, href)}
                  className="hover:text-purple-400 transition duration-300 block"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay when menu is open */}
        {nav && (
          <div
            onClick={() => setNav(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
