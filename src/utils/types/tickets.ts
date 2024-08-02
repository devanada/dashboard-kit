import * as z from "zod";

export const ticketSchema = z.object({
  title: z.string().min(8, { message: "Title is required" }),
  priority: z.enum(["HIGH", "NORMAL", "LOW"], {
    required_error: "Priority is required",
  }),
});

export type TicketSchema = z.infer<typeof ticketSchema>;

export interface ITicket {
  id: number;
  title: string;
  priority: "HIGH" | "NORMAL" | "LOW";
  customer: ICustomer;
  created_at: string;
  updated_at: string;
}

export interface ICustomer {
  name: string;
  profile_picture: string;
}
