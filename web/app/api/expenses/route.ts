import { NextResponse } from 'next/server';

export async function GET() {
  const expenses = [
    {
      id: 1, project: 'Projeto A', subject: 'Compra de material',
      description: 'Compra de material', estimatedValue: 1500, status: 'Reembolsado', justification: 'Comprovante A', date: '2024-10-01'
    },
    {
      id: 2, project: 'Projeto B', subject: 'Viagem de negócios', description: 'Viagem de negócios',
      estimatedValue: 3000, status: 'Justificada', justification: 'Comprovante B', date: '2024-10-15'
    },
    { id: 3, project: 'Projeto C', subject: 'Aluguel de sala', description: 'Aluguel de sala', estimatedValue: 500, status: 'Pendente', justification: '', date: '2024-10-20' },
  ];

  return NextResponse.json(expenses);
}

// import { NextResponse } from 'next/server';

// export async function GET() {
//   // const authHeader = request.headers.get('Authorization');
//   // if (!authHeader) {
//   //   return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
//   // }

//   const expenses = [
//     { id: 1, project: 'Projeto A', subject: 'Compra de material', estimatedValue: 1500, status: 'Reembolsado', justification: 'Comprovante A', date: '2024-10-01' },
//     { id: 2, project: 'Projeto B', subject: 'Viagem de negócios', estimatedValue: 3000, status: 'Justificada', justification: 'Comprovante B', date: '2024-10-15' },
//     { id: 3, project: 'Projeto C', subject: 'Aluguel de sala', estimatedValue: 500, status: 'Pendente', justification: '', date: '2024-10-20' },
//   ];

//   // const token = authHeader.split(' ')[1];
//   // try {
//   //   const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//   //   const userRole = decoded.role;
//   //   const userProjectId = decoded.projectId;

//   //   // Filtra despesas por projeto e acesso
//   //   const filteredExpenses = expenses.filter((expense) =>
//   //     userRole === 'client'
//   //       ? expense.project === userProjectId
//   //       : userRole === 'staff'
//   //   );

//   //   return NextResponse.json(filteredExpenses);
//   // } catch (err) {
//   //   return NextResponse.json({ error: 'Token inválido' }, { status: 403 });
//   // }

//   NextResponse.json(expenses)
// }