import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary  w-full text-white py-12 z-40 ">
      <div className="container mx-auto">
        <h1>OpenEd</h1>
        <hr className="my-0 border-primary" />
        <p className="text-gray-400 text-xs">description</p>
        <div className="flex flex-col items-center mt-20 md:flex-row md:justify-between">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="/Home" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/Kursus" className="hover:text-gray-400">
                  Kursus
                </a>
              </li>
              <li>
                <a href="/Blog" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
