import { Candidate, Comment } from "@/types";
import { makeRequest } from "./api";

export interface AddCandidatePayload {
  firstName: string;
  lastName: string;
  party: string;
  biography: string;
  program: string;
  profilePicture: string;
}

export async function getAllCandidates() {
  return makeRequest<Candidate[]>("/api/candidates", {
    method: "GET",
  });
}

export async function getCandidateById(candidateId: string) {
  return makeRequest<Candidate>(`/api/candidates/${candidateId}`, {
    method: "GET",
  });
}

export async function addCandidate(payload: AddCandidatePayload) {
  return makeRequest<{ message: string }>("/api/candidates", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function addCommentOnCandidate(
  candidateId: string,
  content: string
) {
  return makeRequest<{ message: string }>(
    `/api/candidates/${candidateId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    }
  );
}

export async function deleteCommentFromCandidate(
  candidateId: string,
  commentId: string
) {
  return makeRequest<{ message: string }>(
    `/api/candidates/${candidateId}/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );
}

export async function getCandidateComments(candidateId: string) {
  return makeRequest<Comment[]>(`/api/candidates/${candidateId}/comments`, {
    method: "GET",
  });
}

export async function getCandidateVotes(candidateId: string) {
  return makeRequest<{ candidateId: string; voteCount: number }>(
    `/api/candidates/${candidateId}/votes`,
    {
      method: "GET",
    }
  );
}
