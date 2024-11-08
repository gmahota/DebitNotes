//'use client';

import { getExpenses } from '@/services/expenseService';
import { useEffect, useState } from 'react';

const ExpensesList = () => {
    // const [expenses, setExpenses] = useState<Expense[] | null>(null);

    // useEffect(() => {
    //     async function fetchExpenses() {
    //         const response = await fetch('/api/expenses');
    //         const data = await response.json();
    //         setExpenses(data);
    //     }

    //     fetchExpenses();
    // }, []);
    const expenses = getExpenses();

    if (!expenses) return <p>Carregando...</p>;
    return (
        <div className='mb-12'>
            <h2 className="text-lg font-semibold">Despesas</h2>
            <table className="min-w-full bg-white border rounded-md">
                <thead>
                    <tr >
                        <th className="border px-4 py-2">Data</th>
                        <th className="border px-4 py-2">Descrição</th>
                        <th className="border px-4 py-2">Valor</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Comprovativo</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense:Expense) => (
                        <tr key={expense.id}>
                            <td className="border px-4 py-2">{expense.date}</td>
                            <td className="border px-4 py-2">{expense.subject}</td>
                            <td className="border px-4 py-2">{expense.amount} MT</td>
                            <td className="border px-4 py-2">{expense.status}</td>
                            <td className="border px-4 py-2">
                                {expense.fileUrl ? (
                                    <a href={expense.fileUrl} target="_blank" rel="noopener noreferrer">
                                        Ver Comprovativo
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensesList;
