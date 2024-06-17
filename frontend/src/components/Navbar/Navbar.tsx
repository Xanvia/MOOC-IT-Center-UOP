"use client";
import React, { useState, useEffect, useRef } from "react";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Cookies from "js-cookie";
import {
  MobileLinkClasses,
  MobileMenuClasses,
  NavLink,
  NavLinkContainer,
  NotificationButtonClasses,
  NotificationButtonMobileClasses,
  SecondaryButtonClass,
} from "../components.styles";
import Loader from "../Loarder/Loarder";
import { useGlobal } from "../../contexts/store";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, isLoading, setLoading } = useGlobal();

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

  const onSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setLoading(false);
    window.location.href = "/";
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      profileMenuRef.current &&
      !(profileMenuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <nav className="bg-primary">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                type="button"
                className={MobileMenuClasses}
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu </span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className={NavLinkContainer}>
              <div className="hidden sm:flex flex-shrink-0 items-center">
                <h1 className="text-white text-3xl sm:font-bold">OpenEd</h1>
              </div>
              <div className="hidden pt-2 lg:pl-20 md:ml-6 md:block lg:text-base font-medium text-sm">
                <div className="flex space-x-4">
                  <Link href="/" className={NavLink}>
                    HOME
                  </Link>
                  {/* <Link href="/courses" className={NavLink}>
                  MY COURSES
                </Link> */}

                  <Link href="/" className={NavLink}>
                    ABOUT US
                  </Link>

                  <Link href="/" className={NavLink}>
                    FAQ
                  </Link>
                  {isLoggedIn && (
                    <Link href="/courses" className={SecondaryButtonClass}>
                      My Courses
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-2 lg:pr-20 justify-center">
              {!isLoggedIn && !isLoading ? (
                <>
                  <Login />
                  <Register />
                </>
              ) : (
                <div className="flex md:hidden absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className={NotificationButtonMobileClasses}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button>

                  <ProfileButton
                    isProfileMenuOpen={isProfileMenuOpen}
                    toggleProfileMenu={toggleProfileMenu}
                    profileMenuRef={profileMenuRef}
                    handleSignOut={onSignOut}
                  />
                </div>
              )}
            </div>

            <div className="hidden absolute inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className={NotificationButtonClasses}>
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <ProfileButton
                isProfileMenuOpen={isProfileMenuOpen}
                toggleProfileMenu={toggleProfileMenu}
                profileMenuRef={profileMenuRef}
                handleSignOut={onSignOut}
              />
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a href="#" className={MobileLinkClasses}>
                HOME
              </a>
              <a href="#" className={MobileLinkClasses}>
                ABOUT US
              </a>

              <a href="#" className={MobileLinkClasses}>
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
