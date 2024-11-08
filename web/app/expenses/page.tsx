"use client"; // Necessário para permitir o uso de Hooks do React

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getExpenses } from '@/services/expenseService';
import withAuth from '@/app/utils/withAuth';


const ExpensesPage: React.FC = () => {

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [filter, setFilter] = useState({ status: '', project: '', startDate: '', endDate: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchExpenses() {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setExpenses(data);
    }

    fetchExpenses();
    // Filtrar as despesas com base nos critérios
    let filtered = expenses;

    if (filter.status) {
      filtered = filtered.filter(exp => exp.status === filter.status);
    }
    if (filter.project) {
      filtered = filtered.filter(exp => exp.project!.toLowerCase().includes(filter.project.toLowerCase()));
    }
    if (filter.startDate) {
      filtered = filtered.filter(exp => new Date(exp.date!) >= new Date(filter.startDate));
    }
    if (filter.endDate) {
      filtered = filtered.filter(exp => new Date(exp.date!) <= new Date(filter.endDate));
    }

    setFilteredExpenses(filtered);
  }, [filter, expenses]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, expenseId: string) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('expenseId', expenseId);

    setUploading(true);

    try {
      const response = await fetch('/api/expenses/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert('Comprovativo carregado com sucesso!');

        // Atualize o estado da despesa com o novo status e link do comprovativo
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id.toString() === expenseId
              ? { ...expense, status: 'Justificado', fileUrl: result.expense.fileUrl }
              : expense
          )
        );
      } else {
        alert('Erro ao carregar o comprovativo.');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro no upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Listagem de Despesas</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <div className="flex space-x-4 mb-4">
          <select name="status" onChange={handleFilterChange} className="border rounded-md p-2">
            <option value="">Status</option>
            <option value="Pendente">Pendente</option>
            <option value="Justificada">Justificada</option>
            <option value="Reembolsado">Reembolsado</option>
          </select>
          <input
            type="text"
            name="project"
            placeholder="Projeto"
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="date"
            name="startDate"
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="date"
            name="endDate"
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
        </div>
      </div>

      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Projeto</th>
            <th className="border px-4 py-2">Assunto</th>
            <th className="border px-4 py-2">Valor Estimado (MZN)</th>
            <th className="border px-4 py-2">Data</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Justificativa</th>
            <th className="border px-4 py-2">Comprovativo</th>
          </tr>
        </thead>
        <tbody>
  {filteredExpenses.length > 0 ? (
    filteredExpenses.map(exp => (
      <tr key={exp.id} className="hover:bg-gray-100 cursor-pointer">
        <td className="border px-4 py-2">
          <Link href={`/expenses/${exp.id}`}>{exp.id}</Link>
        </td>
        <td className="border px-4 py-2">
          <Link href={`/expenses/${exp.id}`}>{exp.project}</Link>
        </td>
        <td className="border px-4 py-2">
          <Link href={`/expenses/${exp.id}`}>{exp.subject}</Link>
        </td>
        <td className="border px-4 py-2">{exp.estimatedValue!.toFixed(2)}</td>
        <td className="border px-4 py-2">{new Date(exp.date!).toLocaleDateString()}</td>
        <td className="border px-4 py-2">{exp.status}</td>
        <td>{exp.justification || 'Não justificado'}</td>
              <td>
                {exp.fileUrl ? (
                  <a href={exp.fileUrl} target="_blank" rel="noopener noreferrer">
                    Ver comprovativo
                  </a>
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e, exp.id.toString())}
                      disabled={uploading}
                    />
                  </>
                )}
              </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="border px-4 py-2 text-center">Nenhuma despesa encontrada.</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default ExpensesPage;
