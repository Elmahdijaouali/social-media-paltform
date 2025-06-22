import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import Notifications from "../components/Notifications";

const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and App Name */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Social
            </span>
          </div>

          {/* Center: Search & Icons (hidden on mobile) */}
          <div className="flex-1 flex justify-center items-center gap-12 px-8 max-md:hidden">
            <div className="max-w-sm w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-purple-500">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full bg-gray-50 py-3 pl-10 pr-3 border border-gray-200 rounded-xl leading-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="Search people, posts, or topics..."
                  type="search"
                  name="search"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/app/home"
                className={`flex items-center gap-2 p-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === "/app/home"
                    ? "text-purple-600 bg-purple-50 "
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <Link
                to="/app/messages"
                className={`flex items-center gap-2 p-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === "/app/messages"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
              <Link
                to="/app/friends"
                className={`flex items-center gap-2 p-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === "/app/friends"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <div className="relative" ref={notificationsRef}>
                <button
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    notificationsOpen
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2">
                    <Notifications />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Profile */}
          <div className="flex items-center">
            {/* Mobile: Hamburger menu (moved to right) */}
            <div className="md:hidden flex items-center mr-2">
              <button
                className="p-2 rounded-xl text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-100"
                  src={
                    user?.profileUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
                  }
                  alt="user avatar"
                />
                <span className="hidden md:block font-medium text-sm text-gray-700">
                  {user?.firstname || "User"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl bg-white ring-1 ring-gray-100 focus:outline-none p-2 z-50">
                  <Link
                    to="/app/user-profile"
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </Link>
                  <div className="my-2 border-t border-gray-100"></div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full text-left px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-xl rounded-b-2xl border-t border-gray-100 px-4 py-6 z-40">
            <div className="mb-4">
              <label htmlFor="search-mobile" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-purple-500">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search-mobile"
                  className="block w-full bg-gray-50 py-3 pl-10 pr-3 border border-gray-200 rounded-xl leading-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="Search people, posts, or topics..."
                  type="search"
                  name="search"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/app/home"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full justify-start ${
                  location.pathname === "/app/home"
                    ? "text-purple-600 bg-purple-50 shadow-sm"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-sm font-semibold">Home</span>
              </Link>
              <Link
                to="/app/messages"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full justify-start ${
                  location.pathname === "/app/messages"
                    ? "text-purple-600 bg-purple-50 shadow-sm"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm font-semibold">Messages</span>
              </Link>
              <Link
                to="/app/friends"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full justify-start ${
                  location.pathname === "/app/friends"
                    ? "text-purple-600 bg-purple-50 shadow-sm"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm font-semibold">Friends</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
