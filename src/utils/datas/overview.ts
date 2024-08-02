import { IOverview } from "@/utils/types/overview";

export const sampleOverview: IOverview = {
  total_data: {
    unresolved: 60,
    overdue: 16,
    open: 43,
    on_hold: 64,
  },
  graph: [
    { day: "0", today: 14, yesterday: 33 },
    { day: "1", today: 22, yesterday: 34 },
    { day: "2", today: 27, yesterday: 32 },
    { day: "3", today: 29, yesterday: 27 },
    { day: "4", today: 29, yesterday: 22 },
    { day: "5", today: 29, yesterday: 23 },
    { day: "6", today: 32, yesterday: 26 },
    { day: "7", today: 43, yesterday: 32 },
    { day: "8", today: 51, yesterday: 33 },
    { day: "9", today: 43, yesterday: 33 },
    { day: "10", today: 26, yesterday: 32 },
    { day: "11", today: 19, yesterday: 25 },
    { day: "12", today: 19, yesterday: 19 },
    { day: "13", today: 24, yesterday: 16 },
    { day: "14", today: 36, yesterday: 22 },
    { day: "15", today: 43, yesterday: 34 },
    { day: "16", today: 47, yesterday: 43 },
    { day: "17", today: 45, yesterday: 28 },
    { day: "18", today: 43, yesterday: 30 },
    { day: "19", today: 37, yesterday: 34 },
    { day: "20", today: 0, yesterday: 0 },
    { day: "21", today: 0, yesterday: 0 },
    { day: "21", today: 0, yesterday: 0 },
  ],
  unresolved_tickets: {
    feature_request: 4238,
    customer_response: 1005,
    developer_fix: 914,
    pending: 281,
  },
  tasks: [
    {
      name: "Finish ticket update",
      status: "URGENT",
      complete: false,
    },
    {
      name: "Create new ticket example",
      status: "NEW",
      complete: false,
    },
    {
      name: "Update ticket report",
      status: "DEFAULT",
      complete: true,
    },
  ],
};
