import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ContactItem from "./contact-item"

export default function ContactsSidebar({ contacts, selectedChat, onSelectChat, searchQuery, onSearchChange }) {
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Chat</h1>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
          />
        </div>
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
          <div className="p-4 text-center text-gray-500">
            <p>No contacts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
