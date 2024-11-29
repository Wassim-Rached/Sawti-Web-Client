"use client";

import { useState } from "react";
import { Candidate } from "@/types";
import { HeartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from "@heroicons/react/solid";
import Image from "next/image";
import candidates from "../../../data/fakeCandidates.json";
import comments from "../../../data/fakeComments.json";
import { CommentList } from "@/components/CommentList";

// Define the Candidate Detail page
const CandidateDetails = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Get the candidate details from the fake data
  const fakeCandidate: Candidate = candidates[0];

  // Simulate the favorite and vote actions
  const onToggleFavorite = (id: string) => {
    console.log("Toggling favorite status for candidate with id:", id);
    setIsFavorited(!isFavorited);
  };

  const onVote = (id: string) => {
    console.log("Voting for candidate with id:", id);
    setHasVoted(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-xl transition-shadow hover:shadow-2xl grid grid-cols-1 md:grid-cols-10 gap-8">
          {/* Candidate Image (Left Column) */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-md col-span-4">
            <Image
              src={fakeCandidate.profilePicture}
              alt={`${fakeCandidate.firstName} ${fakeCandidate.lastName}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Candidate Information (Right Column) */}
          <div className="flex flex-col justify-between col-span-6">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-2">
                {fakeCandidate.firstName} {fakeCandidate.lastName}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {fakeCandidate.party}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {fakeCandidate.biography}
              </p>
              <p className="text-lg text-gray-700">{fakeCandidate.program}</p>
            </div>

            {/* Vote and Favorite Buttons */}
            <div className="flex justify-start gap-8 mt-6">
              <button
                onClick={() => onVote(fakeCandidate._id)}
                className={`flex items-center space-x-2 text-sm font-medium ${
                  hasVoted
                    ? "text-green-600"
                    : "text-gray-600 hover:text-green-600"
                } transition-colors duration-200`}
                disabled={hasVoted}
              >
                {hasVoted ? (
                  <CheckCircleIconSolid className="w-6 h-6" />
                ) : (
                  <CheckCircleIcon className="w-6 h-6" />
                )}
                <span>{hasVoted ? "Voted" : "Vote"}</span>
              </button>
              <button
                onClick={() => onToggleFavorite(fakeCandidate._id)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                {isFavorited ? (
                  <HeartIconSolid className="w-6 h-6 text-red-600" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
                <span>{isFavorited ? "Favorited" : "Favorite"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <CommentList comments={comments} />
    </div>
  );
};

export default CandidateDetails;
