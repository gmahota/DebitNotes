// app/admin-area/AuditLog.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';

const AuditLogPage = ({ expenseId }: { expenseId: string }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    async function fetchAuditLogs() {
      const response = await fetch(`/api/audit-log?expenseId=${expenseId}`);
      const data = await response.json();
      setLogs(data);
    }
    fetchAuditLogs();
  }, [expenseId]);

  return (
    <div>
      <h2>Histórico de Auditoria</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ação</TableHead>
            <TableHead>Alterado por</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Justificativa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.changedBy}</TableCell>
              <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              <TableCell>{log.justification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditLogPage;
