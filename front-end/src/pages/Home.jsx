import React from "react";
import Header from "../layouts/Header";
import AddPost from "../components/AddPost";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <AddPost />
      <Posts />
    </div>
  );
};

export default Home;
