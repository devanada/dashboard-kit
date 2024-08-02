import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/utils/states";

const nonLoggedInAccess = ["/login"];

const routeWhitelist: Record<string, string[]> = {
  admin: ["/", "/tickets", "/create-ticket", "/settings"],
  guest: ["/create-ticket"],
};

const ProtectedRoute = () => {
  const { userData } = useAuthStore((state) => state);
  const { pathname } = useLocation();

  if (userData) {
    if (routeWhitelist[userData.role].includes(pathname)) return <Outlet />;
    else return <Navigate to="/create-ticket" />;
  } else {
    if (nonLoggedInAccess.includes(pathname)) return <Outlet />;

    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
