import { useLoaderData } from "react-router-dom";
import { ReactNode, useEffect } from "react";

import Sidebar from "./sidebar";
import Header from "./header";

import { useAuthStore } from "@/utils/states";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { userData } = useAuthStore((state) => state);
  const loaderData = useLoaderData() as string;

  useEffect(() => {
    document.title = loaderData || "Dashboard Kit";
  }, [loaderData]);

  return (
    <div className="flex min-h-screen container">
      {userData && userData.role !== "guest" ? <Sidebar /> : null}
      <div className="w-full flex flex-col">
        {userData ? <Header /> : null}
        <main
          className="w-full flex flex-1 flex-col py-4 gap-5 bg-slate-50 dark:bg-zinc-800 p-8"
          data-testid="content-container"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
