import { Account } from "@/types";
import { makeRequest } from "./api";

export interface RegisterAccountPayload {
  cin: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateAccountPayload {
  firstName: string;
  lastName: string;
}

export async function registerAccount(payload: RegisterAccountPayload) {
  return makeRequest<{ message: string }>("/api/accounts/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginAccount(payload: { cin: string; password: string }) {
  return makeRequest<{ accessToken: string }>("/api/accounts/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getAccountInfo(cin: string) {
  return makeRequest<Account>(`/api/accounts/${cin}`, {
    method: "GET",
  });
}

export async function updateAccount(
  cin: string,
  payload: UpdateAccountPayload
) {
  return makeRequest<{ message: string }>(`/api/accounts/${cin}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function addCandidateToFavorites(
  cin: string,
  candidateId: string
) {
  return makeRequest<{ message: string }>(
    `/api/accounts/${cin}/favorites/${candidateId}`,
    {
      method: "POST",
    }
  );
}

export async function removeCandidateFromFavorites(
  cin: string,
  candidateId: string
) {
  return makeRequest<{ message: string }>(
    `/api/accounts/${cin}/favorites/${candidateId}`,
    {
      method: "DELETE",
    }
  );
}
