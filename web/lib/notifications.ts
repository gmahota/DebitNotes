// libs/notifications.ts

import nodemailer from 'nodemailer';

// Mock de despesas
const mockExpenses = [
  { id: 1, project: 'Projeto A', subject: 'Compra de material', estimatedValue: 1500, status: 'Reembolsado' },
  { id: 2, project: 'Projeto B', subject: 'Viagem de negócios', estimatedValue: 3000, status: 'Justificada' },
];

// Função para gerar relatório mensal
const generateMonthlyReport = () => {
  let totalReembolsado = 0;
  const reportLines = mockExpenses.map(exp => {
    if (exp.status === 'Reembolsado') {
      totalReembolsado += exp.estimatedValue;
    }
    return `${exp.project}: ${exp.subject} - Status: ${exp.status}`;
  });

  const report = `
    Relatório Mensal de Despesas:
    ${reportLines.join('\n')}
    Total Reembolsado: ${totalReembolsado.toFixed(2)} MZN
  `;

  return report;
};

export const sendMonthlyReport = async () => {
  const report = generateMonthlyReport();

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Altere para o servidor SMTP correto
    port: 587,
    auth: {
      user: 'youremail@example.com',
      pass: 'yourpassword',
    },
  });

  const mailOptions = {
    from: 'youremail@example.com',
    to: 'client@example.com', // Email do cliente
    subject: 'Relatório Mensal de Despesas',
    text: report,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Relatório enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o relatório:', error);
  }
};
