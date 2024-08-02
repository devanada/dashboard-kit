import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";
import { IOverview, STATUS_COLOR } from "@/utils/types/overview";
import { toast } from "sonner";
import { getOverview } from "@/utils/apis/overview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { t } = useTranslation();
  const [datas, setDatas] = useState<IOverview>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const result = await getOverview();

      setDatas(result.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  const chartConfig = useMemo(
    () =>
      ({
        today: {
          label: t("Chart Today"),
          color: "hsl(232, 100%, 50%)",
        },
        yesterday: {
          label: t("Chart Yesterday"),
          color: "hsl(232, 2%, 50%)",
        },
      } satisfies ChartConfig),
    []
  );

  return (
    <Layout>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5",
          "[&>div]:bg-card [&>div]:cursor-pointer [&>div]:border [&>div]:w-full [&>div]:py-5 [&>div]:rounded-xl [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:gap-2 hover:[&>div]:border-blue-600 hover:[&>div]:text-blue-600",
          "[&_span]:font-bold [&_span]:text-3xl [&_span]:text-card-foreground [&_p]:font-semibold [&_p]:text-muted-foreground"
        )}
      >
        <div className="group">
          <p className="group-hover:text-blue-600">{t("Total Unresolved")}</p>
          <span className="group-hover:text-blue-600">
            {datas?.total_data.unresolved ?? 0}
          </span>
        </div>
        <div className="group">
          <p className="group-hover:text-blue-600">{t("Total Overdue")}</p>
          <span className="group-hover:text-blue-600">
            {datas?.total_data.overdue ?? 0}
          </span>
        </div>
        <div className="group">
          <p className="group-hover:text-blue-600">{t("Total Open")}</p>
          <span className="group-hover:text-blue-600">
            {datas?.total_data.open ?? 0}
          </span>
        </div>
        <div className="group">
          <p className="group-hover:text-blue-600">{t("Total On Hold")}</p>
          <span className="group-hover:text-blue-600">
            {datas?.total_data.on_hold ?? 0}
          </span>
        </div>
      </div>
      <Card>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 p-0 w-full min-h-full">
          <div className="max-h-[80%] w-full col-span-2">
            <CardHeader>
              <CardTitle>{t("Chart Title")}</CardTitle>
              <CardDescription>
                {t("Chart Desc")} {dayjs().format("DD MMMM YYYY, hh:mm A")}
              </CardDescription>
            </CardHeader>
            <ChartContainer
              config={chartConfig}
              className="min-h-full w-full p-4"
            >
              <AreaChart
                accessibilityLayer
                data={datas?.graph}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <ChartLegend
                  layout="vertical"
                  verticalAlign="top"
                  align="center"
                  content={<ChartLegendContent />}
                />
                <defs>
                  <linearGradient id="fillToday" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-today)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-today)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient
                    id="fillYesterday"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-yesterday)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-yesterday)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} horizontal={true} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  orientation="right"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey="today"
                  type="monotone"
                  fill="url(#fillToday)"
                  fillOpacity={0.4}
                  stroke="var(--color-today)"
                  stackId="a"
                />
                <Area
                  dataKey="yesterday"
                  type="monotone"
                  fill="url(#fillYesterday)"
                  fillOpacity={0.4}
                  stroke="var(--color-yesterday)"
                  stackId="b"
                />
              </AreaChart>
            </ChartContainer>
          </div>
          <div
            className={cn(
              "divide-y border-l",
              "[&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:py-4",
              "[&_span]:font-bold [&_span]:text-2xl [&_p]:text-muted-foreground"
            )}
          >
            <div>
              <p>{t("Statistic Resolved")}</p>
              <span>449</span>
            </div>
            <div>
              <p>{t("Statistic Received")}</p>
              <span>426</span>
            </div>
            <div>
              <p>{t("Statistic Avg First Response")}</p>
              <span>33m</span>
            </div>
            <div>
              <p>{t("Statistic Avg Response")}</p>
              <span>3h 8m</span>
            </div>
            <div>
              <p>{t("Statistic Resolution")}</p>
              <span>94%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div className="space-y-1.5">
              <CardTitle>{t("Unresolved Title")}</CardTitle>
              <CardDescription>
                Group: <span>Support</span>
              </CardDescription>
            </div>
            <Link className="text-blue-600" to="#">
              {t("Unresolved Detail")}
            </Link>
          </CardHeader>
          <CardContent className="divide-y">
            <div className="flex p-4">
              <p className="font-semibold">{t("Unresolved Feature Request")}</p>
              <span className="ml-auto text-muted-foreground">
                {datas?.unresolved_tickets.feature_request ?? 0}
              </span>
            </div>
            <div className="flex p-4">
              <p className="font-semibold">{t("Unresolved Cust Response")}</p>
              <span className="ml-auto text-muted-foreground">
                {datas?.unresolved_tickets.customer_response ?? 0}
              </span>
            </div>
            <div className="flex p-4">
              <p className="font-semibold">{t("Unresolved Developer Fix")}</p>
              <span className="ml-auto text-muted-foreground">
                {datas?.unresolved_tickets.developer_fix ?? 0}
              </span>
            </div>
            <div className="flex p-4">
              <p className="font-semibold">{t("Unresolved Pending")}</p>
              <span className="ml-auto text-muted-foreground">
                {datas?.unresolved_tickets.pending ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div className="space-y-1.5">
              <CardTitle>{t("Tasks Title")}</CardTitle>
              <CardDescription>{t("Tasks Desc")}</CardDescription>
            </div>
            <Link className="text-blue-600" to="#">
              {t("Tasks Detail")}
            </Link>
          </CardHeader>
          <CardContent className="divide-y">
            <div className="flex p-4 items-center">
              <p className="text-muted-foreground">{t("Tasks Create")}</p>
              <Button className="ml-auto" variant="outline" size="icon">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            {datas?.tasks.map((task) => (
              <div className="flex p-4 items-center gap-3" key={task.name}>
                <Checkbox className="rounded-full" checked={task.complete} />
                <p>{task.name}</p>
                <Badge
                  className={cn(
                    "ml-auto",
                    STATUS_COLOR[task.status].bg,
                    STATUS_COLOR[task.status].text
                  )}
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IndexPage;
