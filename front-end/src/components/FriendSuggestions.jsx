import React from "react";

const suggestions = [
  {
    id: 1,
    name: "Najid",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    subtext: "Followed by Dimas",
    followed: true,
  },
  {
    id: 2,
    name: "Sheila Dara",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    subtext: "Suggested for you",
    followed: true,
  },
  {
    id: 3,
    name: "Divaauery",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    subtext: "Suggested for you",
    followed: false,
  },
  {
    id: 4,
    name: "Jhonson",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    subtext: "Followed by Andrea",
    followed: false,
  },
];

const buttonClass =
  "text-xs font-semibold px-4 py-1 rounded-md transition-colors focus:outline-none cursor-pointer min-w-[80px] text-center";

const FriendSuggestions = () => {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 min-w-[260px]">
      <div className="flex items-center justify-between ">
        <h3 className="text-base font-bold text-gray-900">Suggested For you</h3>
        <button
          className={`${buttonClass} underline text-gray-400`}
          type="button"
        >
          See all
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center py-5 gap-5 min-h-[64px]"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="size-12 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {user.subtext}
              </div>
            </div>
            {user.followed ? (
              <button
                className={`${buttonClass} bg-gray-100 text-gray-500 hover:bg-gray-200`}
                type="button"
              >
                Followed
              </button>
            ) : (
              <button
                className={`${buttonClass} bg-purple-50 text-purple-600 hover:bg-purple-100`}
                type="button"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendSuggestions;
