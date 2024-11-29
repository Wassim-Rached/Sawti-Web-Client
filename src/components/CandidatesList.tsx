"use client";

import { useState } from "react";
import { Candidate } from "@/types";
import { CandidateCard } from "@/components/CandidateCard";

// Candidates list component
export const CandidatesList = ({
  candidates,
}: Readonly<{
  candidates: Candidate[];
}>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [votedCandidate, setVotedCandidate] = useState<string | null>(null);

  // Filter candidates based on search term and selected party
  const filteredCandidates = candidates
    .filter((candidate) => {
      return (
        candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((candidate) => {
      if (filter === "") return true;
      return candidate.party === filter;
    });

  const handleVote = (id: string) => {
    setVotedCandidate(id);
    // You can make an API call here to register the vote
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
    // You can make an API call here to toggle the favorite status
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search candidates"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Parties</option>
            <option value="Party A">Party A</option>
            <option value="Party B">Party B</option>
            <option value="Party C">Party C</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CandidateCard
                candidate={candidate}
                isFavorited={favorites.includes(candidate._id)}
                hasVoted={votedCandidate === candidate._id}
                onVote={handleVote}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
