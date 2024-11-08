
# Expense Management System with Audit Logs

This project is a **Expense Management System** that allows employees to request, track, and update expenses. It also provides an **audit trail** of all actions performed on each expense, including detailed logs for tracking changes, status updates, and justifications.

### Features
- **Expense Request**: Employees can submit expense requests with project details, amount, and justification.
- **Expense Approval**: Admins can approve, reject, or mark expenses as justified.
- **Audit Log**: Every change made to an expense is logged, including who made the change, what the change was, and any justification provided.
- **Export Options**: Reports can be exported in PDF or CSV formats.
- **Real-Time Status Updates**: Users can view real-time status of each expense, such as "Pending", "Approved", or "Justified".

### Tech Stack
- **Frontend**: React with Next.js 15.0.2, Shadcn UI for design components
- **Backend**: Node.js with Prisma ORM for database interactions
- **Database**: PostgreSQL (or any other relational database supported by Prisma)
- **Authentication**: Custom session-based user authentication
- **State Management**: React's `useState` and `useEffect` hooks
- **Form Handling**: Custom form management using React state

### Installation

To get the project up and running locally, follow these steps:

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-management-system.git
cd expense-management-system
```

#### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
pnpm install
```

#### 3. Set up Environment Variables

Create a `.env` file in the root of the project and add your environment variables (such as database credentials):

```env
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-next-auth-secret
NEXTAUTH_URL=http://localhost:3000
```

#### 4. Run the Development Server

```bash
pnpm dev
```

Your project should now be running at [http://localhost:3000](http://localhost:3000).

### Features in Detail

#### 1. **Expense Management**

Employees can submit expense requests by filling out a form that includes:
- **Project**: The project associated with the expense.
- **Amount**: The estimated cost of the expense.
- **Status**: Initially set to "Pending" by default.
- **Justification**: Additional comments or reasons for the expense.

#### 2. **Audit Logs**

Every change made to an expense is recorded in the audit log:
- **Action**: The type of change made (e.g., status change, value update).
- **Changed By**: The user who made the change.
- **Changes**: What was changed (e.g., updated amount, updated status).
- **Justification**: The reason for the change.

Audit logs can be viewed by admins to track all updates made to expenses, ensuring transparency in the process.

#### 3. **Reports and Exports**

Admins can generate reports based on the expenses within a given time period. These reports can be exported in the following formats:
- **PDF**: For a printable summary of expenses.
- **CSV**: For data analysis or integration with other tools.

#### 4. **Expense Status Updates**

The system supports different statuses for each expense:
- **Pending**: The expense is awaiting approval.
- **Approved**: The expense has been approved for reimbursement.
- **Justified**: The expense has been justified, and the necessary documents have been provided.

### Usage

#### 1. **Admin View**

Admins have access to:
- **View and manage all expenses**.
- **Update expense status** (Approve, Reject, Justify).
- **Audit logs** to track all changes made to the system.

#### 2. **Employee View**

Employees can:
- **Submit new expense requests**.
- **View the status of their submitted expenses**.
- **Download reports** (PDF/CSV).
- **Upload supporting documents** for expenses that are pending justification.

### Database Schema (Example)

```prisma
model Expense {
  id          String   @id @default(uuid())
  amount      Float
  status      String
  project     String
  justification String?
  fileUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AuditLog {
  id          String   @id @default(uuid())
  expenseId   String
  action      String
  changedBy   String
  changes     Json
  justification String?
  createdAt   DateTime @default(now())
  expense     Expense  @relation(fields: [expenseId], references: [id])
}
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
