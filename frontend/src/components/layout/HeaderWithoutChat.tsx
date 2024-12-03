import React, { useState, useRef } from "react";
import { Menu, Search } from "lucide-react";
import ProfileButton from "../Navbar/ProfileButton";

interface HeaderWchatProps {
  toggleSidebar: () => void;
  courseId: string; // Add courseId prop
}

const HeaderWchat = ({ toggleSidebar }: HeaderWchatProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isLoggedIn = true;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    if (isLoggedIn) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-bold">OpenEd</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className={`relative ${
              isSearchOpen ? "w-64" : "w-8"
            } transition-all duration-300`}
          >
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 pl-8 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSearchOpen ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="absolute left-0 top-0 mt-2 ml-2 text-gray-600"
            >
              <Search size={20} />
            </button>
          </div>

          <ProfileButton
            isProfileMenuOpen={isProfileMenuOpen}
            toggleProfileMenu={toggleProfileMenu}
            profileMenuRef={profileMenuRef}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderWchat;
