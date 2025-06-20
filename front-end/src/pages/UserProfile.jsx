import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const tabs = ["News", "Photos", "About", "Video"];

const UserProfile = ({ onEditProfile = () => {} }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("News");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center font-sans">
      <div className="w-full max-w-5xl">
        {/* Profile Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Cover */}
          <div className="relative h-64 w-full">
            <img
              src={
                user?.coverUrl ||
                "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=80"
              }
              alt="cover"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlapping profile image */}
            <div className="absolute left-10 -bottom-16">
              <div className="rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-blue-400 to-pink-300 shadow-xl">
                <img
                  src={
                    user?.profileUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
                  }
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
          {/* Name, role, actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between px-10 pt-24 pb-6">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
                {user?.firstname || "Your"} {user?.lastname || "Name"}
              </h2>
              <div className="text-sm text-indigo-600 font-medium mt-1">
                Lead Designer at Tech Art Technology
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={onEditProfile}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-8 px-10 border-b border-gray-200 bg-white/60 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-3 px-2 text-gray-600 font-semibold transition-all ${
                  activeTab === tab
                    ? "text-indigo-700"
                    : "hover:text-indigo-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
            {/* About Card */}
            <aside className="md:col-span-1">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 relative">
                <h3 className="font-bold text-lg mb-3 text-indigo-700">
                  About
                </h3>
                <ul className="space-y-4 mt-4 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Lead Designer</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Member of{" "}
                      <span className="font-semibold text-gray-800">
                        Creative Art
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      Joined on{" "}
                      <span className="font-semibold text-gray-800">
                        17-04-2017
                      </span>
                    </span>
                  </li>
                </ul>
                <div className="flex gap-2 mt-7 border-t border-gray-100 pt-5">
                  <div className="text-center flex-1 bg-indigo-50 p-3 rounded-xl">
                    <span className="block text-2xl font-bold text-indigo-600">
                      500
                    </span>
                    <span className="text-gray-500 text-xs font-medium">
                      Followers
                    </span>
                  </div>
                  <div className="text-center flex-1 bg-blue-50 p-3 rounded-xl">
                    <span className="block text-2xl font-bold text-blue-600">
                      150
                    </span>
                    <span className="text-gray-500 text-xs font-medium">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </aside>
            {/* Feed Area */}
            <section className="md:col-span-2">
              {/* Post Input */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                <textarea
                  className="w-full border border-indigo-100 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/70"
                  rows={3}
                  placeholder="What's on your mind?"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2 text-indigo-400">
                    <button className="hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button className="hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all">
                    Post
                  </button>
                </div>
              </div>
              {/* Sample Post */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.profileUrl ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full border-2 border-indigo-200"
                  />
                  <div>
                    <div className="font-semibold text-indigo-700">
                      {user?.firstname} {user?.lastname}
                      Your Name
                    </div>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                </div>
                <p className="text-gray-800 mt-4">
                  This is a sample post. Your posts will appear here, with a
                  refreshed, modern UI that includes likes, comments, and share
                  actions!
                </p>
                <div className="mt-4 flex justify-between items-center text-gray-500">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">1.2k</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="text-sm font-medium">345</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
