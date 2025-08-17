import React, { useState } from "react";
import { createReceivable } from "../api/receivables";
import { useNavigate } from "react-router-dom";
import FormReceivable from "../components/FormReceivable";

export default function ReceivableForm() {
  const [form, setForm] = useState({
    description: "",
    customer: "",
    amount: 0,
    dueDate: "",
    category: "",
  });
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createReceivable(form);
    nav("/receivables");
  };

  return (
    <div>
      <h2>Criar um título</h2>

      <FormReceivable submit={submit} form={form} setForm={setForm} />
    </div>
  );
}
