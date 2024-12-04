"use client";

import { useState } from "react";
import { Account } from "@/types";
import { updateAccount } from "@/services/accounts";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
interface ProfileEditProps {
  account: Account;
  setIsEditing: (editing: boolean) => void;
}

const ProfileEditCard = ({ account, setIsEditing }: ProfileEditProps) => {
  const [firstName, setFirstName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);
  const [cin, setCin] = useState(account.cin);
  const { refreshAccount } = useAuth();

  const handleSave = async () => {
    try {
      await updateAccount(account.cin, { firstName, lastName });
      toast.success("Profile updated successfully");
      refreshAccount();
    } catch (error) {
      console.error(error);
    }

    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="cin"
          className="block text-sm font-medium text-gray-700"
        >
          CIN
        </label>
        <input
          disabled
          id="cin"
          type="text"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={() => setIsEditing(false)}
          className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEditCard;
