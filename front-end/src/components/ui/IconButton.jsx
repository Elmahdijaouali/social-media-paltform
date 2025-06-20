import React from "react";

const IconButton = ({ icon, onClick, className = "", ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton; 