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
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl">
        {/* User Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={post.user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {post.user.name}
              </div>
              <div className="text-xs text-gray-400">{post.user.time}</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="4" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="10" cy="16" r="2" />
            </svg>
          </button>
        </div>
        {/* Post Text & Hashtags */}
        <div className="mb-2 text-gray-800 text-sm">
          {post.text}{" "}
          {post.hashtags.map((tag, idx) => (
            <span
              key={tag}
              className="text-blue-400 hover:underline cursor-pointer mr-1"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Post Image */}
        <div className="rounded-xl overflow-hidden mb-4">
          <img src={post.image} alt="post" className="w-full object-cover" />
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between text-gray-500 mb-2">
          <div className="flex items-center gap-6">
            {/* Like Button */}
            <div className="flex items-center gap-1">
              <IconButton
                onClick={handleLike}
                className={`transition transform active:scale-90 cursor-pointer hover:bg-red-50 ${
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
                className={`text-xs font-semibold ${
                  liked ? "text-red-500" : ""
                }`}
              >
                {Math.floor(likeCount / 1000)}k
              </span>
            </div>
            {/* Comment Button */}
            <div className="flex items-center gap-1">
              <IconButton
                onClick={handleComment}
                className="transition transform active:scale-90 cursor-pointer hover:bg-blue-50 text-blue-400 focus:ring-blue-200"
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
              <span className="text-xs font-semibold text-blue-400">
                {post.comments}
              </span>
            </div>
            {/* Share Button */}
            <div className="flex items-center gap-1">
              <IconButton
                onClick={handleShare}
                className="transition transform active:scale-90 cursor-pointer hover:bg-green-50 text-green-500 focus:ring-green-200"
                icon={
                  // More descriptive paper plane (share/send) icon
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
              <span className="text-xs font-semibold text-green-500">
                {post.shares}
              </span>
            </div>
          </div>
        </div>
        {/* Comment Input */}
        <form
          className="flex items-center gap-3 mt-4 pt-4"
          onSubmit={handlePublishComment}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=profile"
            alt="user avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <Input
            placeholder="Write your comment"
            className="bg-gray-100"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="ml-1 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Publish comment"
            disabled={!comment.trim()}
          >
            {/* More descriptive send icon */}
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
        </form>
      </div>
    </div>
  );
};

export default Posts;
