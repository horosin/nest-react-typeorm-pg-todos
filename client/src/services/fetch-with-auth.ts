export async function fetchWithAuth(
  url: string,
  options: RequestInit
): Promise<Response> {
  const jwt = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).accessToken
    : undefined;
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response;
}
