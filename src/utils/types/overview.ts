export interface IOverview {
  total_data: {
    unresolved: number;
    overdue: number;
    open: number;
    on_hold: number;
  };
  graph: IGraph[];
  unresolved_tickets: {
    feature_request: number;
    customer_response: number;
    developer_fix: number;
    pending: number;
  };
  tasks: ITask[];
}

export interface IGraph {
  day: string;
  today: number;
  yesterday: number;
}

export interface ITask {
  name: string;
  status: "URGENT" | "NEW" | "DEFAULT";
  complete: boolean;
}

export const STATUS_COLOR = {
  URGENT: {
    bg: "bg-yellow-400",
    text: "text-white",
  },
  NEW: {
    bg: "bg-emerald-400",
    text: "text-white",
  },
  DEFAULT: {
    bg: "bg-gray-100",
    text: "text-gray-400",
  },
};
