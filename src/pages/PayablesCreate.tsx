import React, { useState } from "react";
import { createPayable } from "../api/payables";
import { useNavigate } from "react-router-dom";
import FormPayable from "../components/FormPayable";

interface PayableCreateData {
  description: string;
  vendor: string;
  amount: number;
  dueDate: string;
  category: string;
}

export default function PayableCreate() {
  const [form, setForm] = useState<PayableCreateData>({
    description: "",
    vendor: "",
    amount: 0,
    dueDate: "",
    category: "",
  });
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await createPayable(form);
    nav("/payables");
  }

  return (
    <div>
      <h2>Criar um título</h2>

      <FormPayable submit={submit} form={form} setForm={setForm} />
    </div>
  );
}
