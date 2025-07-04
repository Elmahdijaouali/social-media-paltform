// import React from "react";

// const Friends = () => {
//   return <div className="bg-gray-100 min-h-screen">Friends Page</div>;
// };

// export default Friends;


import { useState, useEffect } from "react"
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ViewColumnsIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"
import FriendCard from "@/components/Friends/Friend-card"

export default function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // all, online, offline
  const [viewMode, setViewMode] = useState("grid") // grid, compact, list

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Total counts from backend (updated based on current filter)
  const [totalFriendsCount, setTotalFriendsCount] = useState(15) // Total friends matching current filter
  const [totalOnlineFriendsCount, setTotalOnlineFriendsCount] = useState(8) // Total online friends matching current filter

  // Friends data (gets reset when filter changes)
  const [friends, setFriends] = useState([])

  // Simulate backend API call with filters
  const fetchFriends = async (page = 1, search = "", status = "all", resetData = false) => {
    // Simulate all friends data in "database"
    const allFriendsInDB = [
      {
        id: 1,
        username: "Jennifer Fritz",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "2 hours ago",
        mutualFriends: 12,
      },
      {
        id: 2,
        username: "Laney Gray",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "1 day ago",
        mutualFriends: 8,
      },
      {
        id: 3,
        username: "Oscar Thomson",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "5 minutes ago",
        mutualFriends: 15,
      },
      {
        id: 4,
        username: "Kendra Lord",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "3 hours ago",
        mutualFriends: 6,
      },
      {
        id: 5,
        username: "Gatlin Huber",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "Just now",
        mutualFriends: 20,
      },
      {
        id: 6,
        username: "Fox Mccloud",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "2 days ago",
        mutualFriends: 4,
      },
      {
        id: 7,
        username: "Timothy Gunter",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "30 minutes ago",
        mutualFriends: 9,
      },
      {
        id: 8,
        username: "Jakill Kyle",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "1 week ago",
        mutualFriends: 11,
      },
      {
        id: 9,
        username: "Sarah Wilson",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "1 hour ago",
        mutualFriends: 7,
      },
      {
        id: 10,
        username: "Mike Johnson",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "3 days ago",
        mutualFriends: 14,
      },
      {
        id: 11,
        username: "Emma Davis",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "15 minutes ago",
        mutualFriends: 18,
      },
      {
        id: 12,
        username: "Alex Brown",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "2 hours ago",
        mutualFriends: 5,
      },
      {
        id: 13,
        username: "Lisa Anderson",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "Just now",
        mutualFriends: 22,
      },
      {
        id: 14,
        username: "David Miller",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: false,
        lastSeen: "5 hours ago",
        mutualFriends: 3,
      },
      {
        id: 15,
        username: "Rachel Green",
        profileImage: "/placeholder.svg?height=80&width=80",
        coverImage: "/placeholder.svg?height=128&width=400",
        isOnline: true,
        lastSeen: "2 minutes ago",
        mutualFriends: 16,
      },
    ]

    // Apply server-side filtering
    let filteredData = allFriendsInDB

    // Filter by search query
    if (search.trim()) {
      filteredData = filteredData.filter(
        (friend) =>
          friend.username.toLowerCase().includes(search.toLowerCase()) ||
          friend.lastSeen.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Filter by online status
    if (status === "online") {
      filteredData = filteredData.filter((friend) => friend.isOnline)
    } else if (status === "offline") {
      filteredData = filteredData.filter((friend) => !friend.isOnline)
    }

    // Calculate totals for current filter
    const totalCount = filteredData.length
    const totalOnlineCount = filteredData.filter((friend) => friend.isOnline).length

    // Paginate the filtered data (6 items per page)
    const itemsPerPage = 6
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // Determine if there are more pages
    const hasMorePages = endIndex < filteredData.length

    return {
      friends: paginatedData,
      totalCount,
      totalOnlineCount,
      hasMore: hasMorePages,
      currentPage: page,
    }
  }

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsFiltering(true)
      try {
        const result = await fetchFriends(1, searchQuery, filterStatus, true)
        setFriends(result.friends)
        setTotalFriendsCount(result.totalCount)
        setTotalOnlineFriendsCount(result.totalOnlineCount)
        setHasMore(result.hasMore)
        setCurrentPage(1)
      } catch (error) {
        console.error("Error loading initial data:", error)
      } finally {
        setIsFiltering(false)
      }
    }

    loadInitialData()
  }, []) // Only run on mount

  // Handle filter/search changes
  useEffect(() => {
    const applyFilters = async () => {
      setIsFiltering(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const result = await fetchFriends(1, searchQuery, filterStatus, true)
        setFriends(result.friends) // Reset friends data
        setTotalFriendsCount(result.totalCount)
        setTotalOnlineFriendsCount(result.totalOnlineCount)
        setHasMore(result.hasMore)
        setCurrentPage(1) // Reset to first page
      } catch (error) {
        console.error("Error applying filters:", error)
      } finally {
        setIsFiltering(false)
      }
    }

    // Debounce search queries
    const timeoutId = setTimeout(
      () => {
        applyFilters()
      },
      searchQuery ? 500 : 0,
    ) // 500ms delay for search, immediate for filter

    return () => clearTimeout(timeoutId)
  }, [searchQuery, filterStatus])

  const handleSeeProfile = (friend) => {
    console.log("See profile for:", friend.username)
    // Navigate to profile page
  }

  const handleSendMessage = (friend) => {
    console.log("Send message to:", friend.username)
    // Navigate to chat or open message modal
  }

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore || isFiltering) return

    setIsLoadingMore(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const nextPage = currentPage + 1
      const result = await fetchFriends(nextPage, searchQuery, filterStatus, false)

      if (result.friends.length > 0) {
        setFriends((prevFriends) => [...prevFriends, ...result.friends])
        setCurrentPage(nextPage)
        setHasMore(result.hasMore)
        // Update totals in case they changed
        setTotalFriendsCount(result.totalCount)
        setTotalOnlineFriendsCount(result.totalOnlineCount)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more friends:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // Determine grid classes based on view mode and screen size
  const getGridClasses = () => {
    if (viewMode === "list") {
      return "space-y-3 sm:space-y-4"
    } else if (viewMode === "compact") {
      return "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
    } else {
      return "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Friends</h1>
              <p className="text-sm sm:text-base text-gray-600">
                {isFiltering ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>
                    {totalFriendsCount} friends • {totalOnlineFriendsCount} online
                    {(searchQuery || filterStatus !== "all") && <span className="text-blue ml-1">(filtered)</span>}
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* View Toggle - Now visible on all screen sizes */}
              <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 sm:p-2.5 rounded-md transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-blue text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  title="Grid View"
                >
                  <Squares2X2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-2 sm:p-2.5 rounded-md transition-colors duration-200 ${
                    viewMode === "compact"
                      ? "bg-blue text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  title="Compact Grid"
                >
                  <ViewColumnsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 sm:p-2.5 rounded-md transition-colors duration-200 ${
                    viewMode === "list"
                      ? "bg-blue text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  title="List View"
                >
                  <ListBulletIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple to-blue p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent shadow-sm text-sm sm:text-base"
                disabled={isFiltering}
              />
              {isFiltering && (
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent shadow-sm cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isFiltering}
              >
                <option value="all">All Friends</option>
                <option value="online">Online Only</option>
                <option value="offline">Offline Only</option>
              </select>
              <FunnelIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Friends Grid/List */}
        {isFiltering ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <ArrowPathIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 animate-spin" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Searching friends...</h3>
            <p className="text-gray-500">Please wait while we find your friends</p>
          </div>
        ) : friends.length > 0 ? (
          <div className={`transition-all duration-300 ${getGridClasses()}`}>
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onSeeProfile={handleSeeProfile}
                onSendMessage={handleSendMessage}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <UserGroupIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No friends found</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">
              {searchQuery
                ? `No friends match "${searchQuery}"`
                : filterStatus === "online"
                  ? "No friends are currently online"
                  : "No offline friends found"}
            </p>
            {(searchQuery || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setFilterStatus("all")
                }}
                className="px-4 sm:px-6 py-2 bg-blue text-white rounded-lg hover:bg-lightblue transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {friends.length > 0 && hasMore && !isFiltering && (
          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple to-blue hover:from-lightpurple hover:to-lightblue text-white font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {isLoadingMore ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-spin" />
                  Loading more friends...
                </>
              ) : (
                <>
                  <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Load More Friends
                </>
              )}
            </button>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Showing {friends.length} of {totalFriendsCount} friends
            </p>
          </div>
        )}

        {/* End of Results Message */}
        {friends.length > 0 && !hasMore && !isFiltering && (
          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-600 rounded-lg sm:rounded-xl text-sm sm:text-base">
              <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              You've seen all matching friends ({friends.length} total)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
