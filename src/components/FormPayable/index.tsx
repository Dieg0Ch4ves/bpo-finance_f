import "./styles.scss";

type FormPayableProps = {
  submit: React.FormEventHandler<HTMLFormElement>;
  form: {
    description: string;
    vendor: string;
    amount: number;
    dueDate: string;
    category: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      description: string;
      vendor: string;
      amount: number;
      dueDate: string;
      category: string;
    }>
  >;
};

const FormPayable = (props: FormPayableProps) => {
  const { submit, form, setForm } = props;

  return (
    <form onSubmit={submit} className="card">
      <div className="field">
        <label>Descrição</label>
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Favorecido</label>
        <input
          value={form.vendor}
          onChange={(e) => setForm({ ...form, vendor: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Valor</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required
        />
      </div>

      <div className="field">
        <label>Vencimento</label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Categoria</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
      </div>

      <div className="actions">
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
};

export default FormPayable;
