"use client";

import { useState } from "react";
import { Candidate } from "@/types"; // Assuming Candidate type is defined

const VotePage = () => {
  const [candidate] = useState<Candidate>({
    _id: "5",
    firstName: "Carol",
    lastName: "Davis",
    party: "Party E",
    biography:
      "Carol Davis has extensive experience in business and economic policy.",
    program: "Carol's program aims to boost the economy and create jobs.",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Kais_Saied_2023.jpg/800px-Kais_Saied_2023.jpg",
  });
  const [userName] = useState("User");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Are you sure you want to vote for{" "}
          <span className="text-blue-600">
            {candidate.firstName} {candidate.lastName}
          </span>{" "}
          as {userName}?
        </h2>

        <div className="text-center text-gray-700 mb-6">
          <p className="text-lg">Your vote is important!</p>
        </div>

        <div className="flex justify-center space-x-4">
          {/* Cancel Button */}
          <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
            Cancel
          </button>

          {/* Confirm Vote Button */}
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Confirm Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
