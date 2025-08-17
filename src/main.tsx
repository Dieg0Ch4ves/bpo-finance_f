import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PayableCreate from "./pages/PayablesCreate";
import PayablesList from "./pages/PayablesList";
import PayableUpdate from "./pages/PayablesUpdate";
import ReceivableForm from "./pages/ReceivableCreate";
import ReceivablesList from "./pages/ReceivablesList";
import Summary from "./pages/Summary";
import ReceivableUpdate from "./pages/ReceivablesUpdate";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Summary />} />
          <Route path="payables" element={<PayablesList />} />
          <Route path="receivables" element={<ReceivablesList />} />

          <Route path="payables/new" element={<PayableCreate />} />
          <Route path="payables/edit/:id" element={<PayableUpdate />} />

          <Route path="receivables/new" element={<ReceivableForm />} />
          <Route path="receivables/edit/:id" element={<ReceivableUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
