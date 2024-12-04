"use client";

import { CandidatesList } from "@/components/CandidatesList";
import { useAuth } from "@/context/AuthContext";

const FavoritesPage = () => {
  const { account } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className=" p-4 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Your Favorite Candidates
        </h2>

        <CandidatesList candidates={account!.favorites!} />
      </div>
    </div>
  );
};

export default FavoritesPage;
