import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProtectedRoute from "@/routes/protected-route";
import Index from "@/pages";
import LoginPage from "@/pages/login";
import TicketsPage from "@/pages/tickets";
import CreateTicketPage from "@/pages/tickets/create";
import SettingsPage from "@/pages/settings";
import NotFoundPage from "@/pages/not-found";

const App = () => {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          loader: () => `${t("Navigation Overview")}`,
          element: <Index />,
        },
        {
          path: "/login",
          loader: () => "Login",
          element: <LoginPage />,
        },
        {
          path: "/tickets",
          loader: () => `${t("Navigation Tickets")}`,
          element: <TicketsPage />,
        },
        {
          path: "/create-ticket",
          loader: () => `${t("Navigation Create Ticket")}`,
          element: <CreateTicketPage />,
        },
        {
          path: "/settings",
          loader: () => `${t("Navigation Settings")}`,
          element: <SettingsPage />,
        },
        {
          path: "*",
          loader: () => "Not Found",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
