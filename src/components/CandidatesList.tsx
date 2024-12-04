"use client";

import { useState } from "react";
import { Candidate } from "@/types";
import { CandidateCard } from "@/components/CandidateCard";

export const CandidatesList = ({
  candidates = [],
}: Readonly<{
  candidates: Candidate[];
}>) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search candidates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m2.1-5.25a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-300"
            >
              <CandidateCard candidate={candidate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
