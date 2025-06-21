import React from "react";

// Example static contacts data
const contacts = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: false,
  },
  {
    id: 3,
    name: "Cathy Lee",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    online: true,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    online: false,
  },
  {
    id: 5,
    name: "Emma Brown",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    online: true,
  },
];

const ContactsList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
        <button className="p-2 rounded-full text-gray-400 hover:text-purple-500 hover:bg-purple-50 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 group-hover:ring-purple-200 transition-all duration-200"
                loading="lazy"
              />
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-3 border-white shadow-sm ${
                  contact.online ? "bg-green-500" : "bg-gray-400"
                }`}
                title={contact.online ? "Online" : "Offline"}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {contact.name}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    contact.online ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    contact.online ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {contact.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <button className="p-2 rounded-full text-gray-400 hover:text-purple-500 hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100">
              <svg
                className="w-4 h-4"
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
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition-all duration-200 group">
          <svg
            className="w-4 h-4 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm font-medium">View All Contacts</span>
        </button>
      </div>
    </div>
  );
};

export default ContactsList;
