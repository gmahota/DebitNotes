'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const RealTimeExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        // Função para buscar as despesas iniciais
        async function fetchExpenses() {
            const response = await fetch('/api/expenses');
            const data = await response.json();
            setExpenses(data);
        }

        fetchExpenses();

        // // Conectar ao WebSocket para atualizações em tempo real
        // const socket = new WebSocket('wss://seu-backend.com/ws/expenses');

        // socket.onmessage = (event) => {
        //     const updatedExpense: Expense = JSON.parse(event.data);

        //     setExpenses((prevExpenses) =>
        //         prevExpenses.map((expense) =>
        //             expense.id === updatedExpense.id ? { ...expense, status: updatedExpense.status } : expense
        //         )
        //     );

        //     toast({
        //         title: 'Status atualizado',
        //         description: `A despesa "${updatedExpense.description}" foi atualizada para "${updatedExpense.status}".`,
        //     });
        // };

        // return () => socket.close();
    }, [toast]);

    return (
        <div className='mb-12'>
            <h2 className="text-lg font-semibold">Despesas em Tempo Real</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Última Atualização</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.subject}</TableCell>
                            <TableCell>{expense.amount} MT</TableCell>
                            <TableCell>
                                <Badge color={getStatusColor(expense.status!)}>{expense.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(expense.updatedAt|| "").toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

// Função auxiliar para definir a cor do badge de status
function getStatusColor(status: string) {
    switch (status) {
        case 'Pendente':
            return 'warning';
        case 'Aprovada':
            return 'success';
        case 'Justificada':
            return 'info';
        default:
            return 'default';
    }
}

export default RealTimeExpenses;