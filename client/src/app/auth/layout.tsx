import { Outlet } from "react-router-dom";
import { CheckboxIcon } from "@radix-ui/react-icons";

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <CheckboxIcon className="h-6 w-6 inline mr-2" />
            Tasks App
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This app has saved me from forgetting countless tasks and
                helped me deliver stunning results to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">John Doe</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
