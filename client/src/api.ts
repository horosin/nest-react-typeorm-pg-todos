const API_PATH = import.meta.env.VITE_API_PATH || "http://localhost:3000/api";

function getJwt() {
  const token = JSON.parse(localStorage.getItem("user") || "")?.accessToken;
  return token;
}
export interface Todo {
  id: number;
  title: string;
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
      const createdTodo = await response.json();
      return createdTodo;
    },

    async remove(id: number): Promise<void> {
      await fetch(`${API_PATH}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      });
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
      const data = await response.json();
      return data;
    },
  },
};
