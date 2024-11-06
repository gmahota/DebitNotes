"use client"

import React, { useState } from 'react';
import { getExpensesByPeriod } from '@/services/expenseService'; // Altere o caminho conforme a estrutura do seu projeto
import jsPDF from 'jspdf';

const PeriodSelector: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debitNote, setDebitNote] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const expenses = getExpensesByPeriod(startDate, endDate);
    const note = generateDebitNote(expenses, startDate, endDate);
    setDebitNote(note);
  };

  const generateDebitNote = (expenses: any[], startDate: string, endDate: string) => {
    if (expenses.length === 0) {
      return 'Nenhuma despesa encontrada para o período selecionado.';
    }

    let total = 0;
    const details = expenses.map(expense => {
      total += expense.estimatedValue;
      return `Projeto: ${expense.project}, Assunto: ${expense.subject}, Valor: ${expense.estimatedValue}, Status: ${expense.status}, Justificativa: ${expense.justification}`;
    });

    return `
      Nota de Débito de ${startDate} a ${endDate}:
      ${details.join('\n')}
      Total: ${total.toFixed(2)} MZN
    `;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Nota de Débito', 10, 10);
    doc.setFontSize(12);
    doc.text(debitNote, 10, 20);
    
    doc.save(`nota_de_debito_${startDate}_${endDate}.pdf`);
  };

  return (
    <div>
      <h1>Emissão de Nota de Débito</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start-date">Data de Início:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end-date">Data de Término:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Gerar Nota de Débito</button>
      </form>
      {debitNote && (
        <div>
          <h2>Nota de Débito</h2>
          <pre>{debitNote}</pre>
          <button onClick={exportToPDF}>Exportar para PDF</button>
        </div>
      )}
    </div>
  );
};

export default PeriodSelector;