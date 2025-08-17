import type { Payable } from "../types";
import api from "./client";

export const getPayables = (params?: object) =>
  api.get<Payable[]>("/payables", { params }).then((r) => r.data);

export const getPayable = (id: string) =>
  api.get<Payable>(`/payables/${id}`).then((r) => r.data);

export const createPayable = (payload: Partial<Payable>) =>
  api.post<Payable>("/payables", payload).then((r) => r.data);

export const updatePayable = (id: string, payload: Partial<Payable>) =>
  api.put<Payable>(`/payables/${id}`, payload).then((r) => r.data);

export const deletePayable = (id: string) => api.delete(`/payables/${id}`);

export const payPayable = (id: string) => api.patch(`/payables/${id}/pay`);
