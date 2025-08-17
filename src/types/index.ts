export type StatusPayable = "PENDING" | "PAID" | "OVERDUE";
export type StatusReceivable = "PENDING" | "RECEIVED" | "OVERDUE";

export interface Payable {
  id: string;
  description: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: StatusPayable;
  category: string;
  paidAt?: string | null;
}

export interface Receivable {
  id: string;
  description: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: StatusReceivable;
  category: string;
  receivedAt?: string | null;
}
