export const API_URL: string = (() => {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (!raw) return "";
  if (raw.endsWith("/api/v1")) return raw;
  return `${raw.replace(/\/+$/, "")}/api/v1`;
})();

type RequestOptions = RequestInit & { token?: string };

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL environment variable is not configured");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}
