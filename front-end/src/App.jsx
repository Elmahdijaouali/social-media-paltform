import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default App;
