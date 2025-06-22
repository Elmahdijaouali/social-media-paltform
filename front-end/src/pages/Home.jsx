import React from "react";
import AddPost from "../components/AddPost";
import Posts from "../components/Posts";
import ContactsList from "../components/ContactsList";
import UserProfileCard from "../components/UserProfileCard";
import FriendSuggestions from "../components/FriendSuggestions";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Fixed UserProfileCard and FriendSuggestions */}
          <div className="hidden lg:block">
            <div className="flex flex-col gap-7">
              <UserProfileCard />
              <FriendSuggestions />
            </div>
          </div>

          {/* Middle Column - Scrollable with Posts */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Add Post Component */}
              <AddPost />

              {/* Posts Component */}
              <Posts />
            </div>
          </div>

          {/* Right Column - Contacts List */}
          <div>
            <div className=" top-6">
              <ContactsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
