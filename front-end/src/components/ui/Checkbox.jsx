import React from "react";

const Checkbox = ({ checked, onChange, label, className = "", ...props }) => (
  <label className={`inline-flex items-center space-x-2 cursor-pointer text-sm ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-400 border-gray-300"
      {...props}
    />
    <span>{label}</span>
  </label>
);

export default Checkbox; 