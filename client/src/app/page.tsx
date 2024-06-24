import { FormEvent, useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api, Todo } from "@/api";

export default function Page() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    // api.todos.getAll().then((todos) => {
    //   setTasks(todos);
    // });
  }, []);

  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault();

    const title = (event.target as any)?.elements?.title?.value as string;
    if (title.trim() !== "") {
      const addedTask = await api.todos.create(title);
      setTasks([...tasks, addedTask]);
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      await api.todos.remove(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold">your tasks.</h1>
      <p className="mt-4">make a difference. today.</p>
      <form className="flex items-center mb-4 mt-8" onSubmit={handleAddTask}>
        <Input
          type="text"
          placeholder="add a new task"
          name="title"
          className="flex-1 mr-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button>add</Button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-md bg-muted px-3 py-2"
          >
            <div className="flex items-center">
              <span className="text-sm font-medium">{task.title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveTask(task.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
