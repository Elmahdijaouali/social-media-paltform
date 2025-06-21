import { useState } from "react"
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"

export default function ChatBox({ selectedContact, messages, onSendMessage }) {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a contact from the sidebar to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={selectedContact.avatar || "/placeholder.svg"}
              alt={selectedContact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedContact.active && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-900">{selectedContact.name}</h2>
            <p className={`text-sm ${selectedContact.active ? "text-green-500" : "text-gray-500"}`}>
              {selectedContact.active ? "Active Now" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                  msg.sender === "me" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {msg.sender === "other" && (
                  <img
                    src={msg.avatar || selectedContact.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}

                <div className="flex flex-col">
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-blue text-white"
                        : msg.isFile
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-900 shadow-sm border border-gray-200"
                    }`}
                  >
                    {msg.isFile ? (
                      <div className="flex items-center space-x-2">
                        <PaperClipIcon className="w-4 h-4" />
                        <span className="text-sm">{msg.text}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.text}</p>
                    )}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === "me" && (
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaceSmileIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-500">Start the conversation by sending a message</p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent pr-20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaceSmileIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <PaperClipIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 bg-blue text-white rounded-full hover:bg-lightblue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
