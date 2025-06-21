import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const GeneralLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default GeneralLayout;
