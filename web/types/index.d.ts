declare global {
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
        project: string;
        subject: string;
        estimatedValue: number;
        date: string;
        status: string;
        justification?: string;
        fileUrl?: string;
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