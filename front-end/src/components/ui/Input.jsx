import React from "react";

const Input = React.forwardRef(({ type = "text", value, onChange, placeholder, error, className = "", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red focus:border-red" : "border-silver focus:border-blue"} focus:outline-none focus:ring-2 ${error ? "focus:ring-lightred" : "focus:ring-paleblue"} transition-all duration-200 bg-white text-darkgrey ${className}`}
    {...props}
  />
));

export default Input; 