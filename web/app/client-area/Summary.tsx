// app/client-area/Summary.tsx
'use client';

import { useEffect, useState } from 'react';

const Summary = () => {
    const [summaryData, setSummaryData] = useState({ totalExpenses: 0, reimbursed: 0, balance: 0 });

    useEffect(() => {
        async function fetchSummary() {
            const response = await fetch('/api/summary');
            const data = await response.json();
            setSummaryData(data);
        }

        fetchSummary();
    }, []);

    return (
        <div className="mb-4">
            <h2 className="text-1xl font-bold mb-4">Resumo Financeiro</h2>
            <p>Despesas Totais: {summaryData.totalExpenses} MT</p>
            <p>Valor Reembolsado: {summaryData.reimbursed} MT</p>
            <p>Saldo Pendente: {summaryData.balance} MT</p>
        </div>
    );
};

export default Summary;
