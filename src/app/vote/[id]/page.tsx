"use client";

import { useEffect, useState } from "react";
import { Candidate } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { castVote } from "@/services/votes";
import { getCandidateById } from "@/services/candidates";
import { withAuth } from "@/app/withAuth";
import { toast } from "react-toastify";
import Link from "next/link";

const VotePage = () => {
  const [candidate, setCandidate] = useState<Candidate>();
  const { account } = useAuth();
  const useParam = useParams();

  useEffect(() => {
    const refreshCandidate = async () => {
      const id = useParam.id as string;
      try {
        const candidate = await getCandidateById(id);
        setCandidate(candidate);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch candidate");
      }
    };
    refreshCandidate();
  }, [useParam.id]);

  const handleVote = async () => {
    if (!useParam.id || !account || !candidate) return;

    try {
      await castVote(useParam.id as string);
      toast.success("Vote cast successfully!");
    } catch (error) {
      toast.error("You have already voted");
      console.error(error);
    }
  };

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Are you sure you want to vote for{" "}
          <span className="text-blue-600">
            {candidate.firstName} {candidate.lastName}
          </span>{" "}
          as {account!.firstName + account!.lastName}?
        </h2>

        <div className="text-center text-gray-700 mb-6">
          <p className="text-lg">Your vote is important!</p>
        </div>

        <div className="flex justify-center space-x-4">
          {/* Cancel Button */}
          <Link href="/">
            <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
              Cancel
            </button>
          </Link>

          {/* Confirm Vote Button */}
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleVote}
          >
            Confirm Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(VotePage);
