declare global {
  interface AuditLog {
    id: string;
    expenseId: string;
    action: string;
    changedBy: string;
    changes: string;
    justification: string;
    createdAt: string;
  }

  interface User {
        id: string;
        name: string;
        email: string;
    }

    interface Params {
        id: string;
    }

    // Definindo a interface para uma despesa
    interface Expense {
      id: number;
      project?: string;
      subject?: string;
      description?: string;
      amount?: number;
      estimatedValue?: number;
      date?: string;
      status?: string;
      justification?: string;
      fileUrl?: string;
      updatedAt?: string;
      receipts?: string[],
      notes?: string;
    }

    interface Reimbursement {
        id: string;
        date: string;
        amount: number;
      }
      
      interface BalanceData {
        totalSpent: number;
        totalReimbursed: number;
        pendingBalance: number;
        reimbursements: Reimbursement[];
      }
}

// This is required to make TypeScript treat this file as a module
export { };