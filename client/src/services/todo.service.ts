import { fetchWithAuth } from "./fetch-with-auth";

const API_PATH = import.meta.env.VITE_API_PATH || "http://localhost:3000";

export interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const response = await fetchWithAuth(`${API_PATH}/todos`, {});
    return response.json();
  },

  async create(title: string): Promise<Todo> {
    const response = await fetchWithAuth(`${API_PATH}/todos`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async remove(id: number): Promise<void> {
    await fetchWithAuth(`${API_PATH}/todos/${id}`, { method: "DELETE" });
  },
};
