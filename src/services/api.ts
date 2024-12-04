const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
}

export async function makeRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}
