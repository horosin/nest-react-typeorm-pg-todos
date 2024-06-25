import { FormEvent, useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { todoService, Todo } from "@/services/todo.service";

export default function Page() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    todoService.getAll().then((todos) => {
      setTasks(todos);
    });
  }, []);

  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault();

    const title = (event.target as any)?.elements?.title?.value as string;
    if (title.trim() !== "") {
      const addedTask = await todoService.create(title);
      setTasks([...tasks, addedTask]);
      setNewTask("");
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      await todoService.remove(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      setTasks(updatedTasks);
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
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          className="flex-1 mr-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button>add</Button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between rounded-md bg-muted px-3 py-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            <div className="flex items-center">
              <Checkbox
                id={`task-${task.id}`}
                className="mr-2"
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm font-medium ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </label>
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
