export default function ContactItem({ contact, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
        isSelected ? "bg-blue-50 border-r-2 border-r-blue" : ""
      }`}
    >
      <div className="relative">
        <img
          src={contact.avatar || "/placeholder.svg"}
          alt={contact.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        {contact.active && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      <div className="ml-2 sm:ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.time}</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5 sm:mt-1">{contact.lastMessage}</p>
      </div>
    </div>
  )
}
