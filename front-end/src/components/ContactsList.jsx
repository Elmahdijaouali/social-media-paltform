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
    <aside className="hidden lg:block fixed right-6 top-28 w-64 bg-white rounded-xl shadow-lg p-4 border border-gray-100 z-10">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Contacts</h3>
      <ul className="space-y-3">
        {contacts.map((contact) => (
          <li key={contact.id} className="flex items-center gap-3">
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  contact.online ? "bg-green-400" : "bg-gray-300"
                }`}
                title={contact.online ? "Online" : "Offline"}
              />
            </div>
            <span className="text-sm text-gray-800 truncate max-w-[110px]">
              {contact.name}
            </span>
            <span
              className={`ml-auto text-xs font-medium ${
                contact.online ? "text-green-500" : "text-gray-400"
              }`}
            >
              {contact.online ? "Online" : "Offline"}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ContactsList;
