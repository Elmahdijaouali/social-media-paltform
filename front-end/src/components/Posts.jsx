import React, { useState } from "react";
import IconButton from "./ui/IconButton";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Posts = () => {
  // Static post data for UI demo
  const post = {
    user: {
      name: "Briansky",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "12 minutes ago",
    },
    text: "Beautiful art! 🖼️",
    hashtags: [
      "#art",
      "#aesthetics",
      "#wallstreet",
      "#wallpaper",
      "#photography",
    ],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    likes: 320000,
    comments: 120,
    shares: 148,
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    // Focus comment input or open comment modal (demo: alert)
    alert("Comment action!");
  };

  const handleShare = () => {
    // Share logic (demo: alert)
    alert("Share action!");
  };

  const handlePublishComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      alert(`Comment published: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      {/* User Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={post.user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div>
            <div className="font-semibold text-gray-900 text-base">
              {post.user.name}
            </div>
            <div className="text-sm text-gray-500">{post.user.time}</div>
          </div>
        </div>
        <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="16" r="2" />
          </svg>
        </button>
      </div>

      {/* Post Text & Hashtags */}
      <div className="mb-4 text-gray-800 text-base leading-relaxed">
        {post.text}{" "}
        {post.hashtags.map((tag, idx) => (
          <span
            key={tag}
            className="text-purple-600 hover:text-purple-700 hover:underline cursor-pointer mr-2 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Post Image */}
      <div className="rounded-xl overflow-hidden mb-6">
        <img src={post.image} alt="post" className="w-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 mb-4">
        <div className="flex items-center gap-8">
          {/* Like Button */}
          <div className="flex items-center gap-2">
            <IconButton
              onClick={handleLike}
              className={`transition transform active:scale-90 cursor-pointer hover:bg-red-50 p-2 rounded-full ${
                liked ? "text-red-500" : "text-gray-400"
              } focus:ring-red-200`}
              icon={
                liked ? (
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                )
              }
              aria-label="Like"
            />
            <span
              className={`text-sm font-semibold ${
                liked ? "text-red-500" : "text-gray-600"
              }`}
            >
              {Math.floor(likeCount / 1000)}k
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex items-center gap-2">
            <IconButton
              onClick={handleComment}
              className="transition transform active:scale-90 cursor-pointer hover:bg-blue-50 text-blue-500 focus:ring-blue-200 p-2 rounded-full"
              icon={
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                  />
                </svg>
              }
              aria-label="Comment"
            />
            <span className="text-sm font-semibold text-blue-500">
              {post.comments}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex items-center gap-2">
            <IconButton
              onClick={handleShare}
              className="transition transform active:scale-90 cursor-pointer hover:bg-green-50 text-green-500 focus:ring-green-200 p-2 rounded-full"
              icon={
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 20l18-8-18-8v7l15 1-15 1v7z"
                  />
                </svg>
              }
              aria-label="Share"
            />
            <span className="text-sm font-semibold text-green-500">
              {post.shares}
            </span>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <form
        className="flex items-center gap-3 pt-4 border-t border-gray-100"
        onSubmit={handlePublishComment}
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
          alt="user avatar"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Write your comment..."
            className="w-full bg-gray-50 rounded-xl py-3 pl-4 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 border border-transparent hover:border-gray-200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Publish comment"
            disabled={!comment.trim()}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 20l18-8-18-8v7l15 1-15 1v7z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Posts;
