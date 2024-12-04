"use client";

import { Candidate } from "@/types";
import Image from "next/image";
import { HeartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HS } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  addCandidateToFavorites,
  removeCandidateFromFavorites,
} from "@/services/accounts";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const { account, refreshAccount } = useAuth();

  useEffect(() => {
    if (account && account.favorites) {
      account.favorites.forEach((fav) => {
        if (fav._id === candidate._id) {
          setIsFavorited(true);
        }
      });
    }
  }, [account, candidate._id]);

  const handleToggleFavorite = async (id: string) => {
    if (!account || !id) return;
    if (loadingFavorite) return;

    setLoadingFavorite(true);
    try {
      if (isFavorited) {
        await removeCandidateFromFavorites(account.cin, id);
        setIsFavorited(false);
        toast.success(
          candidate.firstName + candidate.lastName + " removed from favorites"
        );
      } else {
        await addCandidateToFavorites(account.cin, id);
        setIsFavorited(true);
        toast.success(
          candidate.firstName + candidate.lastName + " added to favorites"
        );
      }
      refreshAccount();
    } catch (error) {
      alert("Failed to toggle favorite. Please try again.");
      console.error(error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="w-full h-64 relative">
        <Image
          src={candidate.profilePicture}
          alt={`${candidate.firstName} ${candidate.lastName}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/candidates/${candidate._id}`}>
          <span className="text-2xl font-bold text-gray-800 hover:underline cursor-pointer">
            {candidate.firstName} {candidate.lastName}
          </span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{candidate.party}</p>
        <div className="flex-grow">
          <p className="text-gray-700 mt-4 line-clamp-3">
            {candidate.biography}
          </p>
          <p className="text-gray-700 mt-4 line-clamp-2">{candidate.program}</p>
        </div>
        {account && (
          <div className="flex justify-between items-center mt-4">
            <Link href={`/vote/${candidate._id}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`flex items-center space-x-2 text-sm ${"text-gray-600 hover:text-green-600"}`}
              >
                <CheckCircleIcon className="w-6 h-6" />
                <span>Vote</span>
              </button>
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(candidate._id);
              }}
              className={`flex items-center space-x-2 text-sm ${
                isFavorited
                  ? "text-red-600 hover:text-red-700"
                  : "text-gray-600 hover:text-red-600"
              }`}
              disabled={loadingFavorite}
            >
              {isFavorited ? (
                <HS className="w-6 h-6 text-red-600" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
              <span>{isFavorited ? "Favorited" : "Favorite"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
