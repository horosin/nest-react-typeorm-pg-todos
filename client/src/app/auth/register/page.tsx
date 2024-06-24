import { useState } from "react";
import { UserAuthForm } from "../_components/user-auth-form";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm = async (event: React.SyntheticEvent) => {
    const email = (event.target as any)?.elements?.email?.value as string;
    const password = (event.target as any)?.elements?.password?.value as string;

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    setIsLoading(true);

    try {
      await api.auth.register(email, password);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account.
        </p>
      </div>
      <UserAuthForm
        isLoading={isLoading}
        submitForm={submitForm}
      />
    </div>
  );
}
