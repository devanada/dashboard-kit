import { Filter, ArrowUpWideNarrow } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-end px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
            {t("Table Sort")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("Ticket TH Date")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={
              (table.getColumn("created_at")?.getIsSorted() === "asc"
                ? "asc"
                : "desc") ?? ""
            }
            onValueChange={(e) => {
              const column = table.getColumn("created_at");

              column?.toggleSorting(e !== "asc");
            }}
          >
            <DropdownMenuRadioItem value="asc">
              {t("Table Sort Oldest")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
              {t("Table Sort Latest")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("Ticket TH Priority")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={
              (table.getColumn("priority")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(e) =>
              table.getColumn("priority")?.setFilterValue(e)
            }
          >
            <DropdownMenuRadioItem value="HIGH">HIGH</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="NORMAL">NORMAL</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="LOW">LOW</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isFiltered && (
        <Button variant="ghost" onClick={() => table.resetColumnFilters()}>
          <Cross2Icon className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
