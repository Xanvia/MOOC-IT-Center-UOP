"use client";
import React, { RefObject } from "react";
const DefaultProfileImage = "/images/defaultuser.png";

interface ProfileButtonProps {
  isProfileMenuOpen: boolean;
  toggleProfileMenu: () => void;
  profileMenuRef: RefObject<HTMLDivElement>;
}

const ProfileButton = ({
  isProfileMenuOpen,
  toggleProfileMenu,
  profileMenuRef,
}: ProfileButtonProps) => {
  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded={isProfileMenuOpen}
          aria-haspopup="true"
          onClick={toggleProfileMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={DefaultProfileImage}
            alt=""
          />
        </button>
      </div>
      {isProfileMenuOpen && (
        <div
          ref={profileMenuRef}
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-1"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
