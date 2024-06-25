import { Link } from "react-router-dom";
import { CheckboxIcon, ExitIcon } from "@radix-ui/react-icons";

import { Outlet } from "react-router-dom";
import Footer from "./_components/Footer";
import { useAuth } from "@/auth/hooks/use-auth";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="border-b fixed left-0 top-0 w-full bg-black z-10 text-white">
        <div className="flex h-16 items-center px-4">
          <Link to="/" className="flex items-center font-bold text-xl">
            <CheckboxIcon className="h-6 w-6 inline mr-2" />
            tasks app.
          </Link>
          <div className="ml-5 flex items-center space-x-4">
            <Link to="/" className="hover:underline">
              home
            </Link>
            <Link to="/about" className="hover:underline">
              about
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-secondary hidden md:inline">{user.email}</span>
                <button
                  className="hover:underline"
                  onClick={() => {
                    logout();
                  }}
                >
                  <ExitIcon className="h-4 w-4 inline mr-2" />
                  logout
                </button>
              </>
            ) : (
              <Link to="/auth/login" className="hover:underline">
                login
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="pt-28 pb-4 px-4 max-w-screen-sm mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
