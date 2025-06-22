import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ContactItem from "./contact-item"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function ContactsSidebar({ contacts, selectedChat, onSelectChat, searchQuery, onSearchChange, onClose }) {
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full md:w-64 lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Chat</h1>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden ml-3 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const originalIndex = contacts.findIndex((c) => c.id === contact.id)
            return (
              <ContactItem
                key={contact.id}
                contact={contact}
                isSelected={selectedChat === originalIndex}
                onClick={() => onSelectChat(originalIndex)}
              />
            )
          })
        ) : (
          <div className="p-3 sm:p-4 text-center text-gray-500">
            <p className="text-sm sm:text-base">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
