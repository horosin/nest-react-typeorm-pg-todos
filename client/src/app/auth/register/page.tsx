import { useState } from "react";
import { UserAuthForm } from "../_components/user-auth-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { authService } from "@/services/auth.service";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const submitForm = async (event: React.SyntheticEvent) => {
    const email = (event.target as any)?.elements?.email?.value as string;
    const password = (event.target as any)?.elements?.password?.value as string;

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(email, password);
      navigate("/auth/login");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description:
          "Make sure you are using a valid email address and you don't have an account with us already.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <UserAuthForm isLoading={isLoading} submitForm={submitForm} />
    </div>
  );
}
