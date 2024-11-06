"use client"; // Necessário para permitir que Chart.js funcione no lado do cliente

import React from 'react';
import Link from 'next/link';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Tipagem para os dados do gráfico
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

// Dados simulados para o gráfico
const expenseData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Despesas',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4000, 2500, 3000, 5000, 4500, 7000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Reembolsos',
      data: [800, 1500, 2500, 4000, 1500, 2500, 3000, 2000, 2500, 4000, 3500, 6000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Valores simulados para o resumo
const totalExpenses = 38500; // Total de despesas simuladas
const totalReimbursed = 32000; // Total reembolsado simulado
const pendingBalance = totalExpenses - totalReimbursed; // Saldo pendente

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">

    <Link href="/request-expense" className="text-blue-600 underline">Requisitar Despesas</Link>

    <Link href="/expenses" className="text-blue-600 underline">Listagem de despesas</Link>
    <Link href="/balance" className="text-blue-600 underline">Visão Geral de Saldo</Link>

      <h1 className="text-2xl font-bold mb-4">Resumo do Saldo do Cliente</h1>
      
      {/* Resumo do saldo */}
      <div className="bg-gray-100 p-4 rounded-md mb-8">
        <h2 className="text-lg font-semibold">Resumo Financeiro</h2>
        <p><strong>Despesas Totais:</strong> MZN {totalExpenses.toLocaleString()}</p>
        <p><strong>Valor Reembolsado:</strong> MZN {totalReimbursed.toLocaleString()}</p>
        <p><strong>Saldo Pendente:</strong> MZN {pendingBalance.toLocaleString()}</p>
      </div>

      {/* Gráfico de Barras: Histórico de Despesas e Reembolsos */}
      <div className="my-8">
        <h2 className="text-lg font-semibold mb-4">Histórico de Despesas e Pagamentos</h2>
        <Bar data={expenseData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      {/* Gráfico de Linha: Evolução dos Pagamentos */}
      <div className="my-8">
        <h2 className="text-lg font-semibold mb-4">Evolução Mensal dos Pagamentos</h2>
        <Line data={expenseData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default HomePage;
