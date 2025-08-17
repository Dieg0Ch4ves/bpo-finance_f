import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReceivable, updateReceivable } from "../api/receivables";
import FormReceivable from "../components/FormReceivable";

interface ReceivableUpdateData {
  description: string;
  customer: string;
  amount: number;
  dueDate: string;
  category: string;
}

export default function ReceivableUpdate() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [form, setForm] = useState<ReceivableUpdateData>({
    description: "",
    customer: "",
    amount: 0,
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    loadReceivable();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateReceivable(id, form);
    nav("/receivables");
  };

  const loadReceivable = async () => {
    if (!id) return;
    const receivable = await getReceivable(id);
    setForm({
      description: receivable.description,
      customer: receivable.customer,
      amount: receivable.amount,
      dueDate: receivable.dueDate,
      category: receivable.category,
    });
  };

  return (
    <div>
      <h2>Editar um título</h2>

      <FormReceivable submit={submit} form={form} setForm={setForm} />
    </div>
  );
}
