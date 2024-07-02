"use client";
import React, { RefObject, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { API_URL, HOST } from "@/utils/constants";
import { useGlobal } from "../../contexts/store";

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
  const [ProfileImage, setProfileImage] = useState(DefaultProfileImage);
  const { setIsLoggedIn, setLoading } = useGlobal();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.profile_image) {
        let profileImage = HOST + parsedUser.profile_image;
        setProfileImage(profileImage);
      } else if (parsedUser.profile_picture) {
        setProfileImage(parsedUser.profile_picture);
      }
    }
  }, []);

  const onSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setLoading(false);
    window.location.href = "/";
  };

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
          <Image
            src={ProfileImage}
            alt="Profile Image"
            width={32}
            height={32}
            className="rounded-full"
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
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
          >
            Your Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700"
          >
            Settings
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            onClick={onSignOut}
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
