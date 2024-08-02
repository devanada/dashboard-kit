import { Link, NavLink, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Bell,
  Menu,
  Search,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Notification from "@/components/notification";
import SearchBox from "@/components/search-box";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/utils/states";

const Header = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData() as string;
  const { userData, resetAuth } = useAuthStore((state) => state);

  function handleLogout() {
    toast("Logout Successfully");
    resetAuth();
  }

  return (
    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6 bg-slate-50 dark:bg-zinc-800">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("Sidebar Toggle")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col bg-zinc-800 dark:bg-card p-0 border-r-0"
        >
          <nav className="grid gap-2 text-sm font-medium">
            <div className="flex h-14 items-center justify-center px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold text-muted-foreground"
              >
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="">Dashboard Kit</span>
              </Link>
            </div>
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
              <ChartPie className="h-5 w-5" />
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
              <Ticket className="h-5 w-5" />
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
              <Lightbulb className="h-5 w-5" />
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
              <UsersRound className="h-5 w-5" />
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
              <UserRound className="h-5 w-5" />
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
              <Book className="h-5 w-5" />
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
              <Settings className="h-5 w-5" />
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
              <Ribbon className="h-5 w-5" />
              {t("Navigation Subscription")}
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <p className="text-xl font-semibold">{loaderData}</p>
      </div>
      <div className="flex items-center gap-5">
        {userData?.role !== "guest" ? (
          <>
            <div className="flex items-center">
              <SearchBox>
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </Button>
              </SearchBox>
              <Notification>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
                </Button>
              </Notification>
            </div>
            <Separator orientation="vertical" className="mx-1 h-6" />
          </>
        ) : null}
        <p>{userData?.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon">
              <Avatar>
                <AvatarImage src="https://github.com/devanada.png" />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("Header My Account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              {t("Header Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
