import { useEffect, useState } from "react";
import { getPayables, payPayable, deletePayable } from "../api/payables";
import { formatDate } from "../utils/formatDate";
import type { Payable } from "../types";
import { formatAmount } from "../utils/formatAmount";
import { useNavigate } from "react-router-dom";

const rowClass = (status: Payable["status"]) =>
  status === "OVERDUE"
    ? "row-overdue"
    : status === "PAID"
      ? "row-paid"
      : "row-pending";

export default function PayablesList() {
  const [items, setItems] = useState<Payable[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const data = await getPayables();

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

  const handlePay = async (id: string) => {
    await payPayable(id);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir título?")) return;
    await deletePayable(id);
    await load();
  };

  const handleEdit = (id: string) => {
    navigate(`/payables/edit/${id}`);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <div className="actions">
        <a className="btn" href="/payables/new">
          Novo título
        </a>
      </div>
      <table className="table table-payables">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Favorecido</th>
            <th>Venc.</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
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
              <td className="cell-actions">
                {i.status === "PENDING" && (
                  <button className="action" onClick={() => handlePay(i.id)}>
                    Quitar
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
