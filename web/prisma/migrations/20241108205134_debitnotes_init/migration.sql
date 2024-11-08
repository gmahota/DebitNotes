BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AuditLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [expenseId] INT NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [changedBy] NVARCHAR(1000) NOT NULL,
    [changes] NVARCHAR(1000) NOT NULL,
    [justification] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AuditLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AuditLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Expense] (
    [id] INT NOT NULL IDENTITY(1,1),
    [project] NVARCHAR(1000),
    [subject] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [amount] FLOAT(53),
    [estimatedValue] FLOAT(53),
    [date] DATETIME2,
    [status] NVARCHAR(1000),
    [justification] NVARCHAR(1000),
    [fileUrl] NVARCHAR(1000),
    [updatedAt] DATETIME2,
    [receipts] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    CONSTRAINT [Expense_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reimbursement] (
    [id] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [amount] FLOAT(53) NOT NULL,
    [balanceDataId] INT,
    CONSTRAINT [Reimbursement_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BalanceData] (
    [id] INT NOT NULL IDENTITY(1,1),
    [totalSpent] FLOAT(53) NOT NULL,
    [totalReimbursed] FLOAT(53) NOT NULL,
    [pendingBalance] FLOAT(53) NOT NULL,
    CONSTRAINT [BalanceData_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[AuditLog] ADD CONSTRAINT [AuditLog_expenseId_fkey] FOREIGN KEY ([expenseId]) REFERENCES [dbo].[Expense]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reimbursement] ADD CONSTRAINT [Reimbursement_balanceDataId_fkey] FOREIGN KEY ([balanceDataId]) REFERENCES [dbo].[BalanceData]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
