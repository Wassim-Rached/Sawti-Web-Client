"use client";

import { CandidatesList } from "@/components/CandidatesList";
import { getAllCandidates } from "@/services/candidates";
import { Candidate } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const refreshCandidates = async () => {
    const candidates = await getAllCandidates();
    setCandidates(candidates);
  };

  useEffect(() => {
    refreshCandidates();
  }, []);

  return (
    <div>
      <CandidatesList candidates={candidates} />
    </div>
  );
}
