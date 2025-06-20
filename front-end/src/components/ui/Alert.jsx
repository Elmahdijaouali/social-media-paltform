import React from "react";

const typeStyles = {
  error: "bg-lightred border border-red text-red",
  success: "bg-lightgreen border border-green text-green",
  info: "bg-paleblue border border-blue text-blue",
  warning: "bg-yellow border border-orange text-orange",
};

const Alert = ({ type = "info", children, className = "" }) => (
  <div className={`flex items-center px-4 py-3 rounded-md ${typeStyles[type] || typeStyles.info} ${className}`} role="alert">
    {type === "error" && (
      <svg className="w-5 h-5 mr-2 text-red" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" /></svg>
    )}
    {type === "success" && (
      <svg className="w-5 h-5 mr-2 text-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
    )}
    {type === "info" && (
      <svg className="w-5 h-5 mr-2 text-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" /></svg>
    )}
    {type === "warning" && (
      <svg className="w-5 h-5 mr-2 text-orange" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.516 11.591c.75 1.335-.213 2.985-1.742 2.985H3.483c-1.53 0-2.492-1.65-1.742-2.985L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V9a1 1 0 112 0v1a1 1 0 01-1 1z" clipRule="evenodd" /></svg>
    )}
    <span>{children}</span>
  </div>
);

export default Alert; 