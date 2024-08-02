import { useState, useEffect, useMemo, useCallback } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getTickets, PRIORITY_COLOR } from "@/utils/apis/tickets";
import { ITicket } from "@/utils/types/tickets";

dayjs.extend(relativeTime);

const TicketsPage = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const result = await getTickets();

      setTickets(result.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  const columns = useMemo<ColumnDef<ITicket>[]>(
    () => [
      {
        accessorKey: "",
        header: t("Ticket TH Ticket Detail"),
        cell: ({ row }) => {
          const { customer, title, updated_at } = row.original;

          return (
            <div className="flex gap-5 items-center">
              <Avatar>
                <AvatarImage src={customer.profile_picture} />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground tracking-wide">
                  {t("Ticket TD Sub 1")} {dayjs(updated_at).fromNow()}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "",
        header: t("Ticket TH Cust Name"),
        cell: ({ row }) => {
          const { customer, created_at } = row.original;

          return (
            <div className="flex flex-col">
              <p className="font-semibold">{customer.name}</p>
              <p className="text-xs text-muted-foreground tracking-wide">
                {t("Ticket TD Sub 2")} {dayjs(created_at).format("DD.MM.YYYY")}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: t("Ticket TH Date"),
        cell: ({ row }) => {
          const { created_at } = row.original;

          return (
            <>
              <p className="font-semibold">
                {dayjs(created_at).format("MMMM DD, YYYY")}
              </p>
              <p className="text-xs text-muted-foreground tracking-wide">
                {dayjs(created_at).format("h:mm A")}
              </p>
            </>
          );
        },
      },
      {
        accessorKey: "priority",
        header: t("Ticket TH Priority"),
        cell: ({ row }) => {
          const { priority } = row.original;

          return <Badge className={PRIORITY_COLOR[priority]}>{priority}</Badge>;
        },
      },
      {
        id: "actions",
        cell: () => {
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger data-testid="table-action" asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    {t("Ticket TH Ticket Detail")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t("Ticket TD Action 1")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("Ticket TD Action 2")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <Card>
        <CardHeader className="absolute">
          <CardTitle>{t("Ticket Title")}</CardTitle>
        </CardHeader>
        <CardContent className="divide-y p-0 py-6">
          <DataTable columns={columns} data={tickets} />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TicketsPage;
