// app/services/expenseService.ts

// Mock de despesas (substitua pelo seu banco de dados)
const expenses = [
    { id: 1, project: 'Projeto A', subject: 'Compra de material', estimatedValue: 1500, status: 'Reembolsado', justification: 'Comprovante A', date: '2024-10-01' },
    { id: 2, project: 'Projeto B', subject: 'Viagem de negócios', estimatedValue: 3000, status: 'Justificada', justification: 'Comprovante B', date: '2024-10-15' },
    { id: 3, project: 'Projeto C', subject: 'Aluguel de sala', estimatedValue: 500, status: 'Pendente', justification: '', date: '2024-10-20' },
  ];
  
  // Função para buscar despesas por período
  export const getExpensesByPeriod = (startDate: string, endDate: string) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  };

  export const getExpenses = () => {
    return expenses;
  };
  