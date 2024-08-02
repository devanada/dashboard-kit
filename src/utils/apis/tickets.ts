import { ITicket, TicketSchema } from "@/utils/types/tickets";
import { sampleTickets } from "@/utils/datas/tickets";
import { IResponse } from "@/utils/types/api";

export const getTickets = () => {
  return new Promise<IResponse<ITicket[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Get tickets data successfully",
        data: sampleTickets,
      });
    }, 1000);
  });
};

export const postTicket = (data: TicketSchema) => {
  return new Promise<IResponse<TicketSchema>>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Ticket created successfully",
        data: data,
      });
    }, 1000);
  });
};

export const PRIORITY_COLOR = {
  HIGH: "bg-red-500",
  NORMAL: "bg-emerald-400",
  LOW: "bg-yellow-400",
};
