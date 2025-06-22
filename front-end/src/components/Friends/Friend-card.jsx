"use client"

import { UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"

export default function FriendCard({ friend, onSeeProfile, onSendMessage, viewMode = "grid" }) {
  if (viewMode === "list") {
    // Horizontal list layout for all screen sizes
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="flex items-center p-3 sm:p-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              src={friend.profileImage || "/placeholder.svg?height=60&width=60"}
              alt={friend.username}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            />
            {friend.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 ml-3 sm:ml-4 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{friend.username}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {friend.isOnline ? "Online now" : `Last seen ${friend.lastSeen}`}
            </p>
            {friend.mutualFriends && (
              <p className="text-xs sm:text-sm text-gray-400">{friend.mutualFriends} mutual friends</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 ml-2 sm:ml-4">
            <button
              onClick={() => onSeeProfile(friend)}
              className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md sm:rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm"
            >
              <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Profile
            </button>
            <button
              onClick={() => onSendMessage(friend)}
              className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-blue to-lightblue hover:from-lightblue hover:to-paleblue text-white rounded-md sm:rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm"
            >
              <ChatBubbleLeftIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (viewMode === "compact") {
    // Fixed compact grid layout for all screen sizes
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {/* Mini Cover */}
        <div className="relative h-12 sm:h-16 bg-gradient-to-r from-purple via-lightpurple to-blue flex-shrink-0">
          <img
            src={friend.coverImage || "/placeholder.svg?height=64&width=200"}
            alt={`${friend.username}'s cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple/20 via-lightpurple/20 to-blue/20"></div>
        </div>

        {/* Compact Profile Section */}
        <div className="relative px-2 sm:px-3 pb-2 sm:pb-3 flex-1 flex flex-col">
          {/* Profile Image */}
          <div className="flex justify-center -mt-4 sm:-mt-6 mb-1 sm:mb-2 flex-shrink-0">
            <div className="relative">
              <img
                src={friend.profileImage || "/placeholder.svg?height=48&width=48"}
                alt={friend.username}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-white shadow-md object-cover"
              />
              {friend.isOnline && (
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-white"></div>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="text-center mb-2 sm:mb-3 flex-shrink-0">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate px-1">{friend.username}</h3>
            <p className="text-xs text-gray-500 truncate">{friend.isOnline ? "Online" : "Offline"}</p>
          </div>

          {/* Compact Action Buttons - Stacked vertically for better fit */}
          <div className="flex flex-col space-y-1 mt-auto">
            <button
              onClick={() => onSeeProfile(friend)}
              className="flex items-center justify-center px-1 sm:px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-200 text-xs"
            >
              <UserIcon className="w-3 h-3 mr-1" />
              <span className="truncate">Profile</span>
            </button>
            <button
              onClick={() => onSendMessage(friend)}
              className="flex items-center justify-center px-1 sm:px-2 py-1 bg-gradient-to-r from-blue to-lightblue hover:from-lightblue hover:to-paleblue text-white rounded-md font-medium transition-all duration-200 text-xs"
            >
              <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />
              <span className="truncate">Message</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default grid layout
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative h-24 sm:h-32 bg-gradient-to-r from-purple via-lightpurple to-blue">
        <img
          src={friend.coverImage || "/placeholder.svg?height=128&width=400"}
          alt={`${friend.username}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple/20 via-lightpurple/20 to-blue/20"></div>
      </div>

      {/* Profile Section */}
      <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
        {/* Profile Image */}
        <div className="flex justify-center -mt-8 sm:-mt-12 mb-3 sm:mb-4">
          <div className="relative">
            <img
              src={friend.profileImage || "/placeholder.svg?height=80&width=80"}
              alt={friend.username}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {friend.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{friend.username}</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {friend.isOnline ? "Online now" : `Last seen ${friend.lastSeen}`}
          </p>
          {friend.mutualFriends && <p className="text-xs text-gray-400 mt-1">{friend.mutualFriends} mutual friends</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => onSeeProfile(friend)}
            className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-medium transition-colors duration-200 text-sm sm:text-base"
          >
            <UserIcon className="w-4 h-4 mr-2" />
            See Profile
          </button>
          <button
            onClick={() => onSendMessage(friend)}
            className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue to-lightblue hover:from-lightblue hover:to-paleblue text-white rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
            Message
          </button>
        </div>
      </div>
    </div>
  )
}
