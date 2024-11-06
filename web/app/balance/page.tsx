"use client";

import React, { useEffect, useState } from 'react';
import { Table,TableRow ,TableHeader,TableHead,TableBody,TableCell} from '@/components/ui/table';

import { jsPDF } from 'jspdf';
import Papa from 'papaparse';

const BalanceOverview: React.FC = () => {
    const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  
    useEffect(() => {
      // Função para buscar os dados de saldo e reembolso
      const fetchBalanceData = async () => {
        try {
          const response = await fetch('/api/balance');
          const data = await response.json();
          setBalanceData(data);
        } catch (error) {
          console.error('Erro ao buscar dados de saldo:', error);
        }
      };
  
      fetchBalanceData();
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Histórico de Reembolsos', 20, 20);
        doc.text(`Total Reembolsado: ${balanceData?.totalReimbursed.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}`, 20, 30);
        doc.text(`Saldo Pendente: ${balanceData?.pendingBalance.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}`, 20, 40);
        
        let y = 60;
        balanceData?.reimbursements.forEach((reimbursement) => {
          doc.text(`Data: ${new Date(reimbursement.date).toLocaleDateString('pt-PT')} - Valor: ${reimbursement.amount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}`, 20, y);
          y += 10;
        });
    
        doc.save('historico_reembolsos.pdf');
      };
    
      const downloadCSV = () => {
        const csv = Papa.unparse(balanceData?.reimbursements.map(reimbursement => ({
          Data: new Date(reimbursement.date).toLocaleDateString('pt-PT'),
          Valor: reimbursement.amount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }),
        })) || []);
    
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'historico_reembolsos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  
    if (!balanceData) return <p>Carregando...</p>;
  
    return (
        <section className='transactions'>
        <div className='transactions-header'>
            <h1>Visão Geral de Saldos e Histórico de Reembolsos</h1>

            
        </div>
        <div className='space-y-6'>
        <div className="balance-summary">
          <p><strong>Total de Despesas:</strong> {balanceData.totalSpent.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</p>
          <p><strong>Total Reembolsado:</strong> {balanceData.totalReimbursed.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</p>
          <p><strong>Saldo Pendente:</strong> {balanceData.pendingBalance.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</p>
        </div>

        <div className='flex'>
            <button onClick={downloadPDF}>Baixar PDF</button>
            <button onClick={downloadCSV}>Baixar CSV</button>
        </div>
        
  
        <h2>Histórico de Reembolsos</h2>
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              <TableHead className="px-2">Data</TableHead>
              <TableHead className="px-2">Valor Reembolsado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceData.reimbursements.map((reimbursement) => (
              <TableRow key={reimbursement.id}>
                <TableCell>{new Date(reimbursement.date).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>{reimbursement.amount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </section>
    );
  };
  
  export default BalanceOverview;