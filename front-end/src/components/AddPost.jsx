import React from "react";
import { useAuth } from "../context/AuthProvider";

const AddPost = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border w-1/3 border-gray-100">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={
            user?.profileUrl ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
          }
          alt="user avatar"
        />
        <div className="relative w-full">
          <input
            type="text"
            placeholder={`Share something...`}
            className="w-full bg-gray-100 rounded-full py-3 pl-5 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-indigo-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 font-medium hover:bg-gray-100 hover:text-indigo-600 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-sm">Image</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 font-medium hover:bg-gray-100 hover:text-indigo-600 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-sm">Video</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 font-medium hover:bg-gray-100 hover:text-indigo-600 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-sm">Poll</span>
          </button>
        </div>
        <div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9"
              ></path>
            </svg>
            <span className="text-sm">Public</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
