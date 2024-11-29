"use client";

import { useState } from "react";
import { Account } from "@/types";
import ProfileInfo from "@/components/ProfileInfoCard";
import ProfileEdit from "@/components/ProfileEditCard";

const ProfilePage = () => {
  // Example data for the logged-in user
  const user: Account = {
    _id: "1",
    cin: "12345678",
    firstName: "John",
    lastName: "Doe",
    password: "password123",
    votedFor: "Candidate1",
    favorites: [],
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? "Edit Profile" : "Profile"}
        </h2>

        {/* Displaying Profile Info or Edit Form */}
        {isEditing ? (
          <ProfileEdit user={user} setIsEditing={setIsEditing} />
        ) : (
          <ProfileInfo user={user} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
