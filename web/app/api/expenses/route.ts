// app/api/expenses/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const expenses = [
    { id: 1, project: 'Projeto A', subject: 'Compra de material', estimatedValue: 1500, status: 'Reembolsado', justification: 'Comprovante A', date: '2024-10-01' },
    { id: 2, project: 'Projeto B', subject: 'Viagem de negócios', estimatedValue: 3000, status: 'Justificada', justification: 'Comprovante B', date: '2024-10-15' },
    { id: 3, project: 'Projeto C', subject: 'Aluguel de sala', estimatedValue: 500, status: 'Pendente', justification: '', date: '2024-10-20' },
  ];

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const userProjectId = decoded.projectId;

    const userExpenses = expenses.filter((expense) => expense.project === userProjectId);
    return NextResponse.json(userExpenses);
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 403 });
  }
}
