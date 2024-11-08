// app/admin-area/ExpenseList.tsx
'use client';

import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import {
    Dialog,

    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogPortal,
    DialogTitle,

} from "@/components/ui/dialog"



const ExpenseList = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchExpenses() {
            const response = await fetch('/api/expenses');
            const data = await response.json();
            setExpenses(data);
        }

        fetchExpenses();
    }, []);

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsDialogOpen(true);
    };

    // Dentro de handleSave
    const handleSave = async () => {
        if (selectedExpense) {
            const previousExpense = expenses.find((expense) => expense.id === selectedExpense.id);

            const response = await fetch(`/api/expenses/${selectedExpense.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedExpense),
            });

            if (response.ok) {
                setExpenses((prevExpenses) =>
                    prevExpenses.map((expense) =>
                        expense.id === selectedExpense.id ? selectedExpense : expense
                    )
                );

                // Enviar log de auditoria
                await fetch('/api/audit-log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        expenseId: selectedExpense.id,
                        action: 'Atualização de Despesa',
                        changedBy: 'adminUser', // Substituir pelo usuário autenticado
                        changes: {
                            amount: previousExpense?.amount !== selectedExpense.amount ? selectedExpense.amount : null,
                            status: previousExpense?.status !== selectedExpense.status ? selectedExpense.status : null,
                        },
                        justification: selectedExpense.notes || 'Alteração realizada',
                    }),
                });

                toast({ title: 'Sucesso', description: 'Despesa atualizada com sucesso!' });
                setIsDialogOpen(false);
            } else {
                toast({ title: 'Erro', description: 'Não foi possível atualizar a despesa.' });
            }
        }
    };

    const handleChange = (field: keyof Expense, value:  unknown) => {
        
        if (selectedExpense) {
            setSelectedExpense({ ...selectedExpense, [field]: value! });
        }
    };

    return (
        <div>
            <h1>Área Administrativa - Gestão de Despesas</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.amount} MT</TableCell>
                            <TableCell>
                                <Badge color={getStatusColor(expense.status!)}>{expense.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(expense)}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog para editar despesas */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogPortal>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Despesa</DialogTitle>
                            <DialogDescription>Altere os detalhes da despesa e salve.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Input

                                placeholder="Descrição"
                                value={selectedExpense?.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                disabled
                            />
                            <Input
                                placeholder="Valor"
                                type="number"
                                value={selectedExpense?.amount || 0}
                                onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            />
                            <Select

                                value={selectedExpense?.status || ''}
                                onValueChange={(e) => handleChange('status', e)}
                            >
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="Pendente">Pendente</SelectItem>
                                        <SelectItem value="Aprovada">Aprovada</SelectItem>
                                        <SelectItem value="Justificada">Justificada</SelectItem>
                                    </SelectGroup>
                                </SelectContent>

                            </Select>
                            <Textarea
                                placeholder="Notas"
                                value={selectedExpense?.notes || ''}
                                onChange={(e) => handleChange('notes', e.target.value)}
                            />
                            <Button onClick={handleSave}>Salvar</Button>
                        </form>
                    </DialogContent>
                </DialogPortal>
            </Dialog>

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

export default ExpenseList;
