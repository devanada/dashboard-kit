import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Globe,
  ChartPie,
  Ticket,
  Lightbulb,
  UsersRound,
  UserRound,
  Book,
  Settings,
  Ribbon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden border-r bg-muted/40 md:block bg-zinc-800 dark:bg-card w-72">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-center px-4 py-10 lg:h-[60px] lg:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-muted-foreground"
          >
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="">Dashboard Kit</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <ChartPie className="h-4 w-4" />
              {t("Navigation Overview")}
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <Ticket className="h-4 w-4" />
              {t("Navigation Tickets")}
            </NavLink>
            <NavLink
              to="/ideas"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <Lightbulb className="h-4 w-4" />
              {t("Navigation Ideas")}
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <UsersRound className="h-4 w-4" />
              {t("Navigation Contacts")}
            </NavLink>
            <NavLink
              to="/agents"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <UserRound className="h-4 w-4" />
              {t("Navigation Agents")}
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <Book className="h-4 w-4" />
              {t("Navigation Articles")}
            </NavLink>
            <Separator className="my-4 bg-zinc-700" />
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <Settings className="h-4 w-4" />
              {t("Navigation Settings")}
            </NavLink>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 px-6 py-4 transition-all hover:text-primary",
                  isActive
                    ? "border-l-2 border-l-white bg-muted/5 text-white"
                    : "text-muted-foreground"
                )
              }
            >
              <Ribbon className="h-4 w-4" />
              {t("Navigation Subscription")}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
