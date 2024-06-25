const API_PATH = import.meta.env.VITE_API_PATH || "http://localhost:3000";

function getJwt() {
  const token = JSON.parse(localStorage.getItem("user") || "")?.accessToken;
  return token;
}
export interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

interface AuthResponse {
  accessToken: string;
}

export const api = {
  todos: {
    async getAll(): Promise<Todo[]> {
      const response = await fetch(`${API_PATH}/todos`, {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }

      const todos = await response.json();
      return todos;
    },

    async create(title: string): Promise<Todo> {
      const response = await fetch(`${API_PATH}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJwt()}`,
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }

      const createdTodo = await response.json();
      return createdTodo;
    },

    async remove(id: number): Promise<void> {
      const response = await fetch(`${API_PATH}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }
    },
  },
  auth: {
    async login(email: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${API_PATH}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else if (!response.ok) {
        throw new Error("An error occurred");
      }

      const data = await response.json();
      return data;
    },
    async register(email: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${API_PATH}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 409) {
        throw new Error("User already exists");
      } else if (!response.ok) {
        console.error(response);
        throw new Error("An error occurred");
      }

      const data = await response.json();
      return data;
    },
  },
};
