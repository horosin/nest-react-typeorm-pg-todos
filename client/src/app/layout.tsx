import { Link } from "react-router-dom";
import { CheckboxIcon, TrashIcon } from "@radix-ui/react-icons";

import { Outlet } from "react-router-dom";
import Footer from "./_components/Footer";

export default function Layout() {
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

      <main className="pt-28 pb-4 px-4 max-w-screen-sm mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
