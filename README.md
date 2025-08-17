# 💰 BPO Financeiro - Frontend

Este projeto é um **frontend em React** para gerenciamento de **contas a pagar e a receber**, simulando um sistema de **BPO Financeiro**.  
O objetivo é oferecer uma interface simples e clara para visualizar **receitas, despesas e saldo líquido** mês a mês.

---

## 🚀 Tecnologias

- [React JS](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) (requisições HTTP)
- [Sass](https://sass-lang.com/)

---

## 📂 Estrutura do Projeto

```
src/
├── api/ # Chamadas à API
├── types/ # Model dos dados
├── components/ # Componentes reutilizáveis
├── pages/ # Páginas principais
├── styles/ # Estilização
├── utils/ # Funções auxiliares
├── App.tsx
└── main.tsx
```

## Exemplo .env (.env-example)

Crie um arquivo .env local (não comitar). Aqui está um exemplo a colocar em ./.env-example:

```env
VITE_API_BASE_URL=
```

---

## ⚙️ Como Rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute o projeto:

   ```bash
    npm run dev
   ```

O frontend rodará em: http://localhost:5173

## 📌 Funcionalidades

<p>✅ Cadastro de Contas a Pagar (Payables)</p>
<p>
✅ Cadastro de Contas a Receber (Receivables)
</p>
<p>
✅ Resumo Financeiro com receitas, despesas e saldo líquido
</p>
<p>
✅ Filtro por mês/ano
</p>
<p>
✅ Destaque automático para títulos vencidos (overdue)
</p>
<p>
✅ Listagem de itens do mês em mini tabela
</p>

## 🖼️ Preview das Páginas

### 📊 Resumo Financeiro

- Mostra total de receitas, despesas e saldo líquido
- Mini listagem de títulos do mês selecionado

### 📋 Contas a Pagar

- Lista com status (pendente, pago, vencido)
- Opção de quitar e excluir

### 📋 Contas a Receber

- Lista com status (pendente, recebido, vencido)
- Opção de receber e excluir

## Autor

Diego Chaves — desenvolvedor fullstack.
Contato / repositório: [GitHub](https://github.com/Dieg0Ch4ves)
