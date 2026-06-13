export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (typeof window !== "undefined" && !API_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not set. Assign a value to this environment variable to connect to the back end.");
}

type RequestOptions = RequestInit & { token?: string };

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = API_URL || (typeof window !== "undefined" ? "" : "");
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL environment variable is not configured");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}
