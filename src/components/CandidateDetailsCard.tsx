"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  HeartIcon as HeartIconSolid,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { CheckCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  addCandidateToFavorites,
  removeCandidateFromFavorites,
} from "@/services/accounts";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getCandidateVotes } from "@/services/candidates";

interface CandidateDetailsProps {
  candidate: {
    _id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    party: string;
    biography: string;
    program: string;
  };
  isFavorited: boolean;
}

const CandidateDetailsCard: React.FC<CandidateDetailsProps> = ({
  candidate,
  isFavorited,
}) => {
  const [_isFavorited, setIsFavorited] = useState(isFavorited);
  const [voteCount, setVoteCount] = useState(0);
  const [loadingVotes, setLoadingVotes] = useState(false);
  const { account, refreshAccount, isLoggedIn } = useAuth();

  const refreshCandidateVotes = useCallback(async () => {
    setLoadingVotes(true);
    try {
      const { voteCount } = await getCandidateVotes(candidate._id);
      setVoteCount(voteCount);
    } catch (error) {
      console.error("Error refreshing vote count:", error);
    } finally {
      setLoadingVotes(false);
    }
  }, [candidate._id]);

  useEffect(() => {
    refreshCandidateVotes();
  }, [refreshCandidateVotes]);

  const onToggleFavorite = async (candidateId: string) => {
    if (!account || !account.cin) return;

    try {
      if (_isFavorited) {
        await removeCandidateFromFavorites(account.cin, candidateId);
        setIsFavorited(false);
      } else {
        await addCandidateToFavorites(account.cin, candidateId);
        setIsFavorited(true);
      }
      refreshAccount();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-8 rounded-lg shadow-xl transition-shadow hover:shadow-2xl grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* Candidate Image */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-md col-span-4">
          <Image
            src={candidate.profilePicture}
            alt={`${candidate.firstName} ${candidate.lastName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Candidate Information */}
        <div className="flex flex-col justify-between col-span-6">
          <div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-2">
              {candidate.firstName} {candidate.lastName}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{candidate.party}</p>
            <p className="text-lg text-gray-700 mb-6">{candidate.biography}</p>
            <p className="text-lg text-gray-700">{candidate.program}</p>
          </div>

          {/* Vote Count Display */}
          <div className="flex items-center gap-4 mt-4">
            <p className="text-lg font-medium text-gray-900">
              Votes: <span className="font-bold">{voteCount}</span>
            </p>
            <button
              onClick={refreshCandidateVotes}
              className="flex items-center p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowPathIcon
                className={`w-6 h-6 text-gray-700 ${
                  loadingVotes ? "animate-spin" : ""
                }`}
              />
              <span className="ml-2 text-sm">Refresh</span>
            </button>
          </div>

          {/* Vote and Favorite Buttons */}
          {isLoggedIn && (
            <div className="flex justify-start gap-8 mt-6">
              <Link href={`/vote/${candidate._id}`}>
                <button
                  className={`flex items-center space-x-2 text-sm font-medium ${"text-gray-600 hover:text-green-600"} transition-colors duration-200`}
                  disabled={!account}
                >
                  <CheckCircleIcon className="w-6 h-6" />
                  <span>Vote</span>
                </button>
              </Link>
              <button
                onClick={() => onToggleFavorite(candidate._id)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
                disabled={!account}
              >
                {_isFavorited ? (
                  <HeartIconSolid className="w-6 h-6 text-red-600" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
                <span>{_isFavorited ? "Favorited" : "Favorite"}</span>
              </button>
            </div>
          )}
          {!account && (
            <p className="text-sm text-red-600 mt-4">
              Please{" "}
              <a href="/auth/signin" className="underline text-blue-600">
                log in
              </a>{" "}
              to be able to vote.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsCard;
