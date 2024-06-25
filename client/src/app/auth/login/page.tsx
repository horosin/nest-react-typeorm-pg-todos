import { useState } from "react";
import { UserAuthForm } from "../_components/user-auth-form";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const submitForm = async (event: React.SyntheticEvent) => {
    const email = (event.target as any)?.elements?.email?.value as string;
    const password = (event.target as any)?.elements?.password?.value as string;

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to log in.
        </p>
      </div>
      <UserAuthForm
        isRegister={false}
        isLoading={isLoading}
        submitForm={submitForm}
      />
    </div>
  );
}
