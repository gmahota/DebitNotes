import { NextResponse } from 'next/server';

export async function GET() {
  const balanceData = {
    totalSpent: 50000,
    totalReimbursed: 30000,
    pendingBalance: 20000,
    reimbursements: [
      { id: '1', date: '2024-01-15', amount: 10000 },
      { id: '2', date: '2024-02-10', amount: 15000 },
      { id: '3', date: '2024-03-12', amount: 5000 },
    ],
  };

  return NextResponse.json(balanceData);
}