"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Candidate } from "@/types";
import { CommentList } from "@/components/CommentList";
import CandidateDetailsCard from "@/components/CandidateDetailsCard";
import { getCandidateById } from "@/services/candidates";
import { useAuth } from "@/context/AuthContext";

const CandidateDetails = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [candidate, setCandidate] = useState<Candidate>();
  const params = useParams();

  const { account } = useAuth();

  useEffect(() => {
    const id = params.id;

    if (account && account.favorites) {
      account.favorites.forEach((fav) => {
        if (fav._id === params.id) {
          setIsFavorited(true);
        }
      });
    }

    const refreshCandidateInfo = async () => {
      if (id && typeof id === "string") {
        const candidate = await getCandidateById(id);
        setCandidate(candidate);
      }
    };
    refreshCandidateInfo();
  }, [params.id, account]);

  return (
    <div className="p-6 min-h-screen">
      {candidate ? (
        <CandidateDetailsCard candidate={candidate} isFavorited={isFavorited} />
      ) : (
        <p>Loading candidate details...</p>
      )}
      <CommentList candidateId={params.id as string} />
    </div>
  );
};

export default CandidateDetails;
