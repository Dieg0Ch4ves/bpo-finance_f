import { format } from "date-fns";

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd/MM/yyyy");
}
