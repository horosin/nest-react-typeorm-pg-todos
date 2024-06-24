import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateIcon } from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean;
  isLoading: boolean;
  submitForm: (event: React.SyntheticEvent) => void;
}

export function UserAuthForm({
  className,
  isRegister = true,
  isLoading,
  submitForm,
  ...props
}: UserAuthFormProps) {

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    submitForm(event);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isRegister ? "Create account" : "Log in"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} asChild>
        <Link to={isRegister ? "/auth/login" : "/auth/register"}>
            {isLoading && <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isRegister ? "Log in" : "Create account"}
        </Link>
      </Button>
    </div>
  );
}
