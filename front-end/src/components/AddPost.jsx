import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const AddPost = () => {
  const { user } = useAuth();
  const [privacy, setPrivacy] = useState("public");
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(100);

  // Handle success toast with progress
  useEffect(() => {
    if (success) {
      setProgress(100);
      const duration = 2000; // 2 seconds
      const interval = 50; // Update every 50ms for smooth animation
      const steps = duration / interval;
      const decrement = 100 / steps;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setSuccess(false);
            return 0;
          }
          return prev - decrement;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [success]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!desc.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/posts",
        { desc: desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDesc("");
      setSuccess(true);
      // Optionally trigger posts refresh here
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg min-w-[300px]">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Post added successfully!</span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-green-400 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover ring-2 ring-purple-100"
            src={
              user?.profileUrl ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
            }
            alt="user avatar"
            loading="lazy"
          />
          <div className="relative flex-1">
            <form onSubmit={handlePost}>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={`What's on your mind, ${
                  user?.firstname || "friend"
                }?`}
                className="w-full bg-gray-50 rounded-xl py-4 pl-5 pr-12 text-gray-800 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all 
                 duration-200 border border-transparent hover:border-gray-200"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !desc.trim()}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400
               hover:text-purple-500 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="w-6 h-6 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600
             font-medium hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">Photo</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 font-medium
             hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">Video</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* Privacy Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-600
                 font-medium hover:bg-purple-100 transition-all duration-200 group"
                onClick={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9"
                  />
                </svg>
                <span className="text-sm font-medium capitalize">
                  {privacy}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showPrivacyDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showPrivacyDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border
                 border-gray-100 py-2 z-10"
                >
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50
                     transition-colors"
                    onClick={() => {
                      setPrivacy("public");
                      setShowPrivacyDropdown(false);
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9"
                      />
                    </svg>
                    <span className="text-sm font-medium">Public</span>
                    {privacy === "public" && (
                      <svg
                        className="w-4 h-4 text-purple-600 ml-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-left
                     hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setPrivacy("private");
                      setShowPrivacyDropdown(false);
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Private</span>
                    {privacy === "private" && (
                      <svg
                        className="w-4 h-4 text-purple-600 ml-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Post Button */}
            <button
              type="button"
              onClick={handlePost}
              disabled={loading || !desc.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white
             font-medium hover:bg-purple-700 transition-all duration-200 group disabled:opacity-50"
            >
              {loading ? (
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
              <span className="text-sm font-medium">
                {loading ? "Posting..." : "Post"}
              </span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 text-red-600 text-sm font-medium">{error}</div>
        )}
      </div>
    </>
  );
};

export default AddPost;
