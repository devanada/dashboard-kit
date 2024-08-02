import { ReactNode, useState, useEffect, useCallback } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import dayjs from "dayjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getTickets, PRIORITY_COLOR } from "@/utils/apis/tickets";
import { ITicket } from "@/utils/types/tickets";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

dayjs.extend(relativeTime);

const Notification = (props: Props) => {
  const { children } = props;
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const result = await getTickets();

      setTickets(result.data.slice(0, 20));
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-6">
          <SheetTitle>{t("Notification Title")}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full w-full">
          <div className="w-full h-full divide-y pb-6 flex flex-col">
            {tickets.map((ticket) => (
              <Link
                to="#"
                className="flex items-center px-3 py-6 gap-3 hover:bg-muted/40"
                key={ticket.id}
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex flex-col gap-1">
                  <p>{ticket.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {dayjs(ticket.created_at).fromNow()}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "font-normal ml-auto",
                    PRIORITY_COLOR[ticket.priority]
                  )}
                >
                  {ticket.priority}
                </Badge>
              </Link>
            ))}
            <Link
              to="/tickets"
              className="text-center text-blue-600 font-semibold tracking-wider"
            >
              {t("Tasks Detail")}
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Notification;
