const API_PATH = import.meta.env.VITE_API_PATH || "http://localhost:3000";

interface AuthResponse {
  accessToken: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_PATH}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login error ${response.status}: ${errorText}`);
    }
    return response.json();
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_PATH}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Register error ${response.status}: ${errorText}`);
    }
    return response.json();
  },
};
