import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./index.scss";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
