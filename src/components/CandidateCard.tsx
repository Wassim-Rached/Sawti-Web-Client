import { Candidate } from "@/types";
import Image from "next/image";
import { HeartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HS,
  CheckCircleIcon as CS,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface CandidateCardProps {
  candidate: Candidate;
  isFavorited: boolean;
  hasVoted: boolean;
  onVote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

// Candidate card component
export const CandidateCard = ({
  candidate,
  isFavorited,
  hasVoted,
  onVote,
  onToggleFavorite,
}: CandidateCardProps) => {
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
        <div className="flex justify-between items-center mt-4">
          {/* Vote Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking vote button
              onVote(candidate._id);
            }}
            className={`flex items-center space-x-2 text-sm ${
              hasVoted ? "text-green-600" : "text-gray-600 hover:text-green-600"
            }`}
            disabled={hasVoted}
          >
            {hasVoted ? (
              <CS className="w-6 h-6" />
            ) : (
              <CheckCircleIcon className="w-6 h-6" />
            )}
            <span>{hasVoted ? "Voted" : "Vote"}</span>
          </button>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking favorite button
              onToggleFavorite(candidate._id);
            }}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600"
          >
            {isFavorited ? (
              <HS className="w-6 h-6 text-red-600" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
            <span>{isFavorited ? "Favorited" : "Favorite"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
