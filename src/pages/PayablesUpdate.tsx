import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPayable, updatePayable } from "../api/payables";
import FormPayable from "../components/FormPayable";

interface PayableUpdateData {
  description: string;
  vendor: string;
  amount: number;
  dueDate: string;
  category: string;
}

export default function PayableUpdate() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [form, setForm] = useState<PayableUpdateData>({
    description: "",
    vendor: "",
    amount: 0,
    dueDate: "",
    category: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    await updatePayable(id, form);
    nav("/payables");
  }

  async function loadPayable() {
    if (!id) return;
    const payable = await getPayable(id);
    setForm({
      description: payable.description,
      vendor: payable.vendor,
      amount: payable.amount,
      dueDate: payable.dueDate,
      category: payable.category,
    });
  }

  useEffect(() => {
    loadPayable();
  }, [id]);

  return (
    <div>
      <h2>Editar um título</h2>

      <FormPayable submit={submit} form={form} setForm={setForm} />
    </div>
  );
}
