"use client";

import { useState, useEffect } from "react";
import { CandidatesList } from "@/components/CandidatesList"; // Assuming CandidateList is reused
import { Candidate } from "@/types"; // Make sure to define Candidate type or use any suitable type
import fakeCandidates from "../../data/fakeCandidates.json"; // Fake data for this example

const FavoritesPage = () => {
  // Fake list of favorite candidates
  const [favorites, setFavorites] = useState<Candidate[]>([]);

  useEffect(() => {
    // Simulating fetching the favorite candidates from an API or local storage
    setFavorites(fakeCandidates); // For this example, we're using the fake data directly
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className=" p-4 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Your Favorite Candidates
        </h2>

        {/* Render Candidate List */}
        <CandidatesList candidates={favorites} />
      </div>
    </div>
  );
};

export default FavoritesPage;
