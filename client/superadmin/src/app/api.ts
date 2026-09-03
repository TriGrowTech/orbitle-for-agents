const API_BASE = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch helper for SuperAdmin API calls.
 * Sends x-sa-key header for authentication.
 */
export async function saFetch(path: string, options?: RequestInit & { rawBody?: boolean }) {
  const saKey = localStorage.getItem('sa_key') || '';

  const headers: Record<string, string> = {
    'x-sa-key': saKey,
  };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!options?.rawBody) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...headers, ...((options?.headers as Record<string, string>) || {}) },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
