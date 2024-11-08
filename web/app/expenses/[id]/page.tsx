"use client";

import { FC } from 'react';

import { useEffect, useState } from 'react';
  
// Dados simulados para despesas, incluindo links para comprovativos
const mockExpenses = [
  { id: 1, project: 'Projeto A', subject: 'Compra de material', estimatedValue: 1500, date: '2024-10-01', status: 'Pendente', receipts: ['/comprovativos/compra-material.pdf'] },
  { id: 2, project: 'Projeto B', subject: 'Viagem de negócios', estimatedValue: 3000, date: '2024-10-05', status: 'Justificada', receipts: ['/comprovativos/viagem-negocios.pdf'] },
  { id: 3, project: 'Projeto A', subject: 'Aluguel de espaço', estimatedValue: 2500, date: '2024-10-10', status: 'Reembolsado', receipts: ['/comprovativos/aluguel-espaco.pdf'] },
  { id: 4, project: 'Projeto C', subject: 'Serviços de consultoria', estimatedValue: 1200, date: '2024-10-12', status: 'Pendente', receipts: ['/comprovativos/consultoria.pdf'] },
];

const ExpenseDetailsPage: FC<{ params: Params }>= ({ params }) => {
  
  const { id } = params; // Alterado para usar 'router.query' corretamente

  const [expense, setExpense] = useState<Expense>(); // Use 'any' se a interface não for definida

  useEffect(() => {
    if (id) {
      const expenseDetails = mockExpenses.find(exp => exp.id === Number(id));
      setExpense(expenseDetails);
    }
  }, [id]);

  if (!expense) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Despesa</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold">Informações da Despesa</h2>
        <p><strong>Projeto:</strong> {expense.project}</p>
        <p><strong>Assunto:</strong> {expense.subject}</p>
        <p><strong>Valor Estimado (MZN):</strong> {expense.estimatedValue.toFixed(2)}</p>
        <p><strong>Data:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {expense.status}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold">Comprovativos</h2>
        {expense.receipts && expense.receipts.length > 0 ? (
          <ul>
            {expense.receipts.map((receipt, index) => (
              <li key={index}>
                <a href={receipt} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Comprovativo {index + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há comprovativos disponíveis.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetailsPage;
