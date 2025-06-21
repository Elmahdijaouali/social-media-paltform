import React from "react";

const Notifications = () => {
  // Mock notifications data - replace with real data from your backend
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "John Doe liked your post",
      time: "2 minutes ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: 2,
      type: "comment",
      message: "Jane Smith commented on your photo",
      time: "5 minutes ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: 3,
      type: "friend",
      message: "Mike Johnson sent you a friend request",
      time: "1 hour ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    {
      id: 4,
      type: "like",
      message: "Sarah Wilson liked your post",
      time: "2 hours ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "comment":
        return (
          <svg
            className="w-4 h-4 text-blue-500"
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
        );
      case "friend":
        return (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        );
      default:
        return (
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="w-80 rounded-xl shadow-2xl bg-white ring-1 ring-[#eee] ring-opacity-5 focus:outline-none p-2 z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
          Mark all as read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  notification.read
                    ? "hover:bg-gray-50"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={notification.avatar}
                    alt="user avatar"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p
                      className={`text-sm ${
                        notification.read
                          ? "text-gray-700"
                          : "text-gray-900 font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex-shrink-0 ml-2">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-gray-100 px-3 py-2">
          <button className="w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
