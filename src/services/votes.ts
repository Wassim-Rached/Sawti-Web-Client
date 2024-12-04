import { makeRequest } from "./api";

export async function castVote(candidateId: string) {
  return makeRequest<string>("/api/votes", {
    method: "POST",
    body: JSON.stringify({ candidateId }),
  });
}
