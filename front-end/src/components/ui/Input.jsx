import React from "react";

const Input = React.forwardRef(({ type = "text", value, onChange, placeholder, error, className = "", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900 ${className}`}
    {...props}
  />
));

export default Input; 