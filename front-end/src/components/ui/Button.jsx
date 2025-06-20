import React from "react";

const Button = ({ type = "button", children, isLoading, loadingText, className = "", ...props }) => (
  <button
    type={type}
    className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple to-blue hover:from-lightpurple hover:to-lightblue transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading ? (
      <>
        <span className="inline-block align-middle mr-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        </span>
        {loadingText || "Loading..."}
      </>
    ) : (
      children
    )}
  </button>
);

export default Button; 