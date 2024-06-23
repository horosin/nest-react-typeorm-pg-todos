const API_PATH = import.meta.env.API_PATH || "http://localhost:3000";

export interface Todo {
    id: number;
    title: string;
}

export const api = {
    todos: {
        async getAll(): Promise<Todo[]> {
            const response = await fetch(`${API_PATH}/todos`);
            const todos = await response.json();
            return todos;
        },
        async create(title: string): Promise<Todo> {
            const response = await fetch(`${API_PATH}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });
            const createdTodo = await response.json();
            return createdTodo;
        },
    },
};
