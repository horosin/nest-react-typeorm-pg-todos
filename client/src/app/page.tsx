import { Link } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CheckboxIcon, TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Footer from "./_components/Footer";

import { api, Todo } from "@/api";

export default function Page() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    api.todos.getAll().then((todos) => {
      setTasks(todos);
    });
  }, []);

  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault();

    const title = (event.target as HTMLFormElement).elements.title.value;

    const addedTask = await api.todos.create(title);

    if (title.trim() !== "") {
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
    <div>
      <div className="border-b fixed left-0 top-0 w-full bg-black z-10 text-white">
        <div className="flex h-16 items-center px-4">
          <Link to="/" className="flex items-center font-bold text-xl">
            <CheckboxIcon className="h-6 w-6 inline mr-2" />
            Tasks App
          </Link>
          <div className="ml-5 flex items-center space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
      <main className="pt-20 pb-4 px-4 max-w-screen-sm mx-auto">
        <h1 className="text-3xl font-bold">Your tasks</h1>
        <p className="mt-4">Make a difference. Today.</p>
        <form className="flex items-center mb-4 mt-8" onSubmit={handleAddTask}>
          <Input
            type="text"
            placeholder="Add a new task"
            name="title"
            className="flex-1 mr-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button>Add</Button>
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
      </main>
      <Footer />
    </div>
  );
}
