import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const { user, userLoading } = useAuth();
  const stats = [
    {
      label: "Posts",
      value: user?.postsCount ?? 12,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Friends",
      value: user?.friendsCount ?? 87,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Followers",
      value: user?.followersCount ?? 120,
      color: "bg-orange-50 text-orange-700",
    },
  ];

  const navigate = useNavigate();

  if (userLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse min-w-[260px]">
        <div className="h-16 w-16 rounded-full bg-gray-200 mb-4 mx-auto" />
        <div className="h-4 w-2/3 bg-gray-200 mx-auto mb-2 rounded" />
        <div className="h-3 w-1/2 bg-gray-100 mx-auto mb-4 rounded" />
        <div className="flex justify-between mt-6">
          <div className="h-3 w-8 bg-gray-100 rounded" />
          <div className="h-3 w-8 bg-gray-100 rounded" />
          <div className="h-3 w-8 bg-gray-100 rounded" />
        </div>
        <div className="h-8 w-24 bg-gray-100 mx-auto mt-6 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-0 flex flex-col items-center min-w-[260px] overflow-hidden group">
      {/* Cover Image */}
      <div className="w-full h-16 bg-gray-100 relative">
        <img
          src={
            user?.coverUrl ||
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
          }
          alt="cover"
          className="w-full h-full object-cover object-center"
        />
        {/* Decorative Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-50 to-orange-50 opacity-60" />
      </div>
      {/* Avatar with Glow - Overlapping Cover */}
      <div className="relative z-10 -mt-8 mb-2">
        <div className="absolute -inset-1 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 blur-xl opacity-50" />
        </div>
        <img
          src={
            user?.profileUrl ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
          }
          alt="User avatar"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-200 border-4 border-white shadow-md relative z-10"
          loading="lazy"
        />
      </div>
      {/* User Info */}
      <div className="text-lg font-extrabold text-gray-900 text-center mt-1">
        {user?.firstname || "Your Name"} {user?.lastname || ""}
      </div>
      <div className="px-3 py-1 rounded-full bg-gray-50 text-xs text-purple-600 font-semibold mb-3 mt-1">
        @{user?.username || "username"}
      </div>
      {/* Stats */}
      <div className="flex justify-between w-full mt-2 mb-4 gap-2 px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center flex-1">
            <span
              className={`px-3 py-1 rounded-full font-bold text-xs mb-1 ${stat.color}`}
            >
              {stat.value}
            </span>
            <span className="text-[11px] text-gray-500 font-semibold mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <button
        className="mt-2 mb-4 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-lightpurple text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center gap-2 text-sm cursor-pointer"
        onClick={() => navigate("/user-profile")}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Profile
      </button>
    </div>
  );
};

export default UserProfileCard;
