import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Component() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          {isRouteErrorResponse(error) && (error?.status || "404")}
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>
            {isRouteErrorResponse(error)
              ? error.statusText
              : "Please try again later."}
          </i>
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-gray-50 shadow hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
