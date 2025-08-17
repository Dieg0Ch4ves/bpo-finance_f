import { useEffect, useMemo, useState } from "react";
import { getPayables } from "../api/payables";
import { getReceivables } from "../api/receivables";
import type { Payable, Receivable } from "../types";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";

export default function Summary() {
  const [payables, setPayables] = useState<Payable[]>([]);
  const [receivables, setReceivables] = useState<Receivable[]>([]);
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const normalizeOverdue = <T extends { status: string; dueDate: string }>(
    items: T[]
  ) => {
    const now = new Date();
    return items.map((i) =>
      i.status === "PENDING" && new Date(i.dueDate) < now
        ? { ...i, status: "OVERDUE" as const }
        : i
    );
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const [p, r] = await Promise.all([getPayables(), getReceivables()]);
      setPayables(normalizeOverdue(p));
      setReceivables(normalizeOverdue(r));
      setLoading(false);
    };
    loadAll();
  }, []);

  const reload = async () => {
    setLoading(true);
    const [p, r] = await Promise.all([getPayables(), getReceivables()]);
    setPayables(normalizeOverdue(p));
    setReceivables(normalizeOverdue(r));
    setLoading(false);
  };

  const { pMonth, rMonth, totals } = useMemo(() => {
    const [yr, mo] = month.split("-");
    const selectedYear = parseInt(yr, 10);
    const selectedMonth = parseInt(mo, 10);

    const inMonth = (iso: string) => {
      const d = new Date(iso);
      return (
        d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth
      );
    };

    const pMonth = payables.filter((p) => inMonth(p.dueDate));
    const rMonth = receivables.filter((r) => inMonth(r.dueDate));

    const sum = (arr: { amount: number }[]) =>
      arr.reduce((s, a) => s + a.amount, 0);

    const totalPayablesAll = sum(pMonth);
    const totalReceivablesAll = sum(rMonth);

    const pPending = sum(pMonth.filter((i) => i.status === "PENDING"));
    const pOverdue = sum(pMonth.filter((i) => i.status === "OVERDUE"));
    const pPaid = sum(pMonth.filter((i) => i.status === "PAID"));

    const rPending = sum(rMonth.filter((i) => i.status === "PENDING"));
    const rOverdue = sum(rMonth.filter((i) => i.status === "OVERDUE"));
    const rReceived = sum(rMonth.filter((i) => i.status === "RECEIVED"));

    const sortByDueAsc = <T extends { dueDate: string }>(arr: T[]) =>
      [...arr].sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

    const topPayables = sortByDueAsc(
      pMonth.filter((i) => i.status === "PENDING" || i.status === "OVERDUE")
    ).slice(0, 8);

    const topReceivables = sortByDueAsc(
      rMonth.filter((i) => i.status === "PENDING" || i.status === "OVERDUE")
    ).slice(0, 8);

    return {
      pMonth,
      rMonth,
      totals: {
        totalPayablesAll,
        totalReceivablesAll,
        netAll: totalReceivablesAll - totalPayablesAll,
        pPending,
        pOverdue,
        pPaid,
        rPending,
        rOverdue,
        rReceived,
      },
      topPayables,
      topReceivables,
    };
  }, [payables, receivables, month]);

  const rowClass = (status: string) =>
    status === "OVERDUE"
      ? "row-overdue"
      : status === "PAID" || status === "RECEIVED"
        ? "row-paid"
        : "row-pending";

  if (loading) return <p>Carregando resumo...</p>;

  return (
    <div className="summary card">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Resumo do mês</h2>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            Mês:
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </label>
          <button className="btn" onClick={reload}>
            Atualizar
          </button>
        </div>
      </header>

      <div
        className="grid"
        style={{
          gap: 12,
          marginTop: 12,
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        }}
      >
        <div className="stat">
          <small>Receitas (mês)</small>
          <strong>{formatAmount(totals.totalReceivablesAll)}</strong>
          <div style={{ marginTop: 8 }}>
            <span className="badge received">
              Recebidas {formatAmount(totals.rReceived)}
            </span>{" "}
            <span className="badge pending">
              Pendentes {formatAmount(totals.rPending)}
            </span>{" "}
            <span className="badge overdue">
              Atrasadas {formatAmount(totals.rOverdue)}
            </span>
          </div>
        </div>

        <div className="stat">
          <small>Despesas (mês)</small>
          <strong>{formatAmount(totals.totalPayablesAll)}</strong>
          <div style={{ marginTop: 8 }}>
            <span className="badge paid">
              Pagas {formatAmount(totals.pPaid)}
            </span>{" "}
            <span className="badge pending">
              Pendentes {formatAmount(totals.pPending)}
            </span>{" "}
            <span className="badge overdue">
              Atrasadas {formatAmount(totals.pOverdue)}
            </span>
          </div>
        </div>

        <div className="stat">
          <small>Saldo líquido (mês)</small>
          <strong style={{ color: totals.netAll >= 0 ? "green" : "red" }}>
            {formatAmount(totals.netAll)}
          </strong>
        </div>
      </div>

      <div
        className="grid"
        style={{ marginTop: 18, gap: 16, gridTemplateColumns: "1fr 1fr" }}
      >
        <section className="card" style={{ padding: 10 }}>
          <h3 style={{ marginTop: 0 }}>
            A pagar • itens do mês ({pMonth.length})
          </h3>
          <table className="table table-payables" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Favorecido</th>
                <th>Venc.</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pMonth.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", opacity: 0.7 }}>
                    Nenhum item no mês
                  </td>
                </tr>
              )}
              {pMonth.slice(0, 8).map((i) => (
                <tr key={i.id} className={rowClass(i.status)}>
                  <td>{i.description}</td>
                  <td>{i.vendor}</td>
                  <td>{formatDate(i.dueDate)}</td>
                  <td>{formatAmount(i.amount)}</td>
                  <td>
                    <span className={`badge ${i.status.toLowerCase()}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="actions" style={{ marginTop: 8 }}>
            <a className="btn" href="/payables">
              Ver todos
            </a>
          </div>
        </section>

        <section className="card" style={{ padding: 10 }}>
          <h3 style={{ marginTop: 0 }}>
            A receber • itens do mês ({rMonth.length})
          </h3>
          <table className="table table-receivables" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Cliente</th>
                <th>Venc.</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rMonth.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", opacity: 0.7 }}>
                    Nenhum item no mês
                  </td>
                </tr>
              )}
              {rMonth.slice(0, 8).map((i) => (
                <tr key={i.id} className={rowClass(i.status)}>
                  <td>{i.description}</td>
                  <td>{i.customer}</td>
                  <td>{formatDate(i.dueDate)}</td>
                  <td>{formatAmount(i.amount)}</td>
                  <td>
                    <span className={`badge ${i.status.toLowerCase()}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="actions" style={{ marginTop: 8 }}>
            <a className="btn" href="/receivables">
              Ver todos
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
