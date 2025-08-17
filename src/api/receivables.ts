import type { Receivable } from "../types";
import api from "./client";

export const getReceivables = (params?: object) =>
  api.get<Receivable[]>("/receivables", { params }).then((r) => r.data);

export const getReceivable = (id: string) =>
  api.get<Receivable>(`/receivables/${id}`).then((r) => r.data);

export const createReceivable = (payload: Partial<Receivable>) =>
  api.post<Receivable>("/receivables", payload).then((r) => r.data);

export const updateReceivable = (id: string, payload: Partial<Receivable>) =>
  api.put<Receivable>(`/receivables/${id}`, payload).then((r) => r.data);

export const deleteReceivable = (id: string) =>
  api.delete(`/receivables/${id}`);

export const receiveReceivable = (id: string) =>
  api.patch(`/receivables/${id}/receive`);
