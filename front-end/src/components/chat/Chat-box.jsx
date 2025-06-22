import { useState, useRef, useEffect } from "react"
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"
import avatar0 from "../../imgs/user.png"

export default function ChatBox({ selectedContact, messages, onSendMessage, onDeleteForMe, onDeleteForEveryone, onToggleSidebar }) {
  const [message, setMessage] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, messageId: null })
  const fileInputRef = useRef(null)

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ show: false, x: 0, y: 0, messageId: null })
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() || selectedFiles.length > 0) {
      setIsUploading(true)
      
      try {
        // Handle file uploads first
        const uploadedFiles = []
        if (selectedFiles.length > 0) {
          for (const file of selectedFiles) {
            // For demonstration purposes, create a mock URL
            // In a real app, you would upload to your backend endpoint
            const mockUrl = URL.createObjectURL(file)
            
            uploadedFiles.push({
              name: file.name,
              url: mockUrl,
              type: file.type,
              size: file.size
            })
          }
        }

        // Send message with files
        onSendMessage(message, uploadedFiles)
        setMessage("")
        setSelectedFiles([])
      } catch (error) {
        console.error('Error handling files:', error)
        // Handle error - maybe show a toast notification
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    
    // Validate files
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]
      
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`)
        return false
      }
      
      return true
    })
    
    // Limit to 5 files
    if (selectedFiles.length + validFiles.length > 5) {
      alert('Maximum 5 files allowed.')
      return
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles])
    e.target.value = '' // Reset input
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImageFile = (file) => {
    return file.type.startsWith('image/')
  }

  // Handle right-click on message
  const handleMessageContextMenu = (e, messageId) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      messageId
    })
  }

  // Handle delete for me
  const handleDeleteForMe = (messageId) => {
    onDeleteForMe(messageId)
    setContextMenu({ show: false, x: 0, y: 0, messageId: null })
  }

  // Handle delete for everyone
  const handleDeleteForEveryone = (messageId) => {
    onDeleteForEveryone(messageId)
    setContextMenu({ show: false, x: 0, y: 0, messageId: null })
  }

  // Get the message object for context menu
  const getMessageById = (messageId) => {
    return messages.find(msg => msg.id === messageId)
  }

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
            <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Select a conversation</h3>
          <p className="text-sm sm:text-base text-gray-500">Choose a contact from the sidebar to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
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
          {/* Mobile Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 bg-gray-50 min-h-0">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              onContextMenu={(e) => handleMessageContextMenu(e, msg.id)}
            >
              <div
                className={`flex items-end space-x-1 sm:space-x-2 max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg ${
                  msg.sender === "me" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {msg.sender === "other" && (
                  <img
                    src={msg.avatar || selectedContact.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}

                <div className="flex flex-col min-w-0 flex-1">
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base ${
                      msg.deleted
                        ? "bg-gray-100 text-gray-500 italic"
                        : msg.sender === "me"
                          ? "bg-purple text-white"
                          : "bg-white text-gray-900 shadow-sm border border-gray-200"
                    }`}
                  >
                    {msg.deleted ? (
                      <p className="text-xs sm:text-sm italic break-words">{msg.text}</p>
                    ) : (
                      <>
                        {msg.text && <p className="text-xs sm:text-sm break-words leading-relaxed">{msg.text}</p>}
                        {msg.files && msg.files.length > 0 && (
                          <div className="mt-2 space-y-1 sm:space-y-2">
                            {msg.files.map((file, fileIndex) => (
                              <div key={fileIndex}>
                                {file.type.startsWith('image/') ? (
                                  // Display images in full form
                                  <img
                                    src={file.url}
                                    alt={file.name}
                                    className="max-w-full rounded-lg object-contain"
                                    style={{ maxHeight: '300px' }}
                                  />
                                ) : (
                                  // Display other files as compact attachments
                                  <div className={`flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg ${
                                    msg.sender === "me" ? "bg-white bg-opacity-20" : "bg-gray-100"
                                  }`}>
                                    <PaperClipIcon className={`w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0 ${
                                      msg.sender === "me" ? "text-white" : "text-gray-500"
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-xs font-medium truncate ${
                                        msg.sender === "me" ? "text-white" : "text-gray-900"
                                      }`}>{file.name}</p>
                                      <p className={`text-xs ${
                                        msg.sender === "me" ? "text-white text-opacity-80" : "text-gray-500"
                                      }`}>{formatFileSize(file.size)}</p>
                                    </div>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`text-xs hover:underline flex-shrink-0 ${
                                        msg.sender === "me" ? "text-white text-opacity-90" : "text-blue-500"
                                      }`}
                                    >
                                      View
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Handle legacy isFile messages */}
                        {msg.isFile && !msg.files && (
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <PaperClipIcon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                              msg.sender === "me" ? "text-white" : "text-gray-500"
                            }`} />
                            <span className="text-xs sm:text-sm break-words">{msg.text}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === "me" && (
                  <img
                    src={avatar0}
                    alt="Your avatar"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <FaceSmileIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No messages yet</h3>
              <p className="text-sm sm:text-base text-gray-500">Start the conversation by sending a message</p>
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu.show && (() => {
        const message = getMessageById(contextMenu.messageId)
        const isSender = message?.sender === "me"
        const isDeleted = message?.deleted
        
        return (
          <div 
            className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] sm:min-w-[160px]"
            style={{ 
              left: contextMenu.x, 
              top: contextMenu.y,
              transform: 'translate(-50%, -100%) translateY(-10px)'
            }}
          >
            {isDeleted ? (
              // Only show "Delete for me" for deleted messages
              <button
                onClick={() => handleDeleteForMe(contextMenu.messageId)}
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Delete for me</span>
              </button>
            ) : (
              // Show both options for regular messages, but "Delete for everyone" only for sender
              <>
                <button
                  onClick={() => handleDeleteForMe(contextMenu.messageId)}
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Delete for me</span>
                </button>
                {isSender && (
                  <button
                    onClick={() => handleDeleteForEveryone(contextMenu.messageId)}
                    className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Delete for everyone</span>
                  </button>
                )}
              </>
            )}
          </div>
        )
      })()}

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-2 sm:p-4 flex-shrink-0">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                {isImageFile(file) ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <PaperClipIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <div className="mt-1 text-xs text-gray-500 truncate w-16 sm:w-20">
                  {file.name}
                </div>
                <div className="text-xs text-gray-400">
                  {formatFileSize(file.size)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-2 sm:p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent pr-16 sm:pr-20 text-sm sm:text-base"
            />
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaceSmileIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <PaperClipIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={(!message.trim() && selectedFiles.length === 0) || isUploading}
            className="p-2 sm:p-3 bg-purple text-white rounded-full hover:bg-lightpurple disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}
