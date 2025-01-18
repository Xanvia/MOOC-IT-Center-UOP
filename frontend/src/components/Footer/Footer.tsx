import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary w-full text-white py-8 px-24 z-20 mt-32">
      <div className="container">
        <hr className="my-0 border-primary" />
        <div className="flex flex-col space-y-2">
          {/* <img src="/images/uop log.png" alt="UOP Logo" className="w-32 h-32" /> */}
          <div className="flex justify-between items-center">
            {/* UOP Logo */}
            <Image
              src="/images/uop log.png"
              alt="UOP Logo"
              width={120}
              height={120}
            />
            {/* OpenEd Logo */}
            <Image
              src="/images/white_logo.png"
              alt="OpenEd Logo"
              width={200}
              height={150}
            />
          </div>
          <p className="text-gray-400 text-xs">powered by</p>
          <p className="text-gray-400 text-xs">IT Center</p>
          <p className="text-gray-400 text-md">University of Peradeniya</p>
        </div>
        <div className="flex flex-col items-center mt-12 md:flex-row md:justify-between">
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
                <a href="/aboutus" className="hover:text-gray-400">
                  About Us
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
