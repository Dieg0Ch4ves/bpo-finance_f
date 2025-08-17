import { useEffect, useState } from "react";
import {
  getReceivables,
  receiveReceivable,
  deleteReceivable,
} from "../api/receivables";
import type { Receivable } from "../types";
import { formatDate } from "../utils/formatDate";
import { formatAmount } from "../utils/formatAmount";
import { useNavigate } from "react-router-dom";

const rowClass = (status: Receivable["status"]) =>
  status === "OVERDUE"
    ? "row-overdue"
    : status === "RECEIVED"
      ? "row-received"
      : "row-pending";

export default function ReceivablesList() {
  const [items, setItems] = useState<Receivable[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const data = await getReceivables();

    const now = new Date();
    const adjusted = data.map((i) => {
      if (i.status === "PENDING" && new Date(i.dueDate) < now) {
        return { ...i, status: "OVERDUE" as const };
      }
      return i;
    });

    setItems(adjusted);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleReceive = async (id: string) => {
    await receiveReceivable(id);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir título?")) return;
    await deleteReceivable(id);
    await load();
  };

  const handleEdit = (id: string) => {
    navigate(`/receivables/edit/${id}`);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <div className="actions">
        <a className="btn" href="/receivables/new">
          Novo título
        </a>
      </div>
      <table className="table table-receivables">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Cliente</th>
            <th>Venc.</th>
            <th>Valor</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
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
              <td className="cell-actions">
                {i.status === "PENDING" && (
                  <button
                    className="action"
                    onClick={() => handleReceive(i.id)}
                  >
                    Receber
                  </button>
                )}

                <button onClick={() => handleEdit(i.id)}>Editar</button>

                <button className="delete" onClick={() => handleDelete(i.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", opacity: 0.7 }}>
                Nenhum título encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
