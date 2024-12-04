"use client";

import { useState } from "react";
import ProfileInfo from "@/components/ProfileInfoCard";
import ProfileEdit from "@/components/ProfileEditCard";
import { useAuth } from "@/context/AuthContext";
import { Account } from "@/types";
import { withAuth } from "../withAuth";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { account } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? "Edit Profile" : "Profile"}
        </h2>

        {/* Displaying Profile Info or Edit Form */}
        {isEditing ? (
          account && (
            <ProfileEdit account={account} setIsEditing={setIsEditing} />
          )
        ) : (
          <ProfileInfo
            account={account as Account}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
