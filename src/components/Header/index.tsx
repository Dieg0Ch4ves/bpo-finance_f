import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  return (
    <header className="header">
      <h1 className="brand">BPO Finance (Demo)</h1>
      <nav>
        <NavLink className="navlink" to="/">
          Resumo
        </NavLink>
        <NavLink className="navlink" to="/payables">
          Contas a Pagar
        </NavLink>
        <NavLink className="navlink" to="/receivables">
          Contas a Receber
        </NavLink>
      </nav>
    </header>
  );
}
