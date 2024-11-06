import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Função para enviar e-mail com anexos
export const sendDebitNoteEmail = async (recipient: string, debitNote: string, attachments: string[]) => {
  // Configuração do Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Altere para o servidor SMTP correto
    port: 587,
    auth: {
      user: 'youremail@example.com',
      pass: 'yourpassword',
    },
  });

  // Criação do corpo do e-mail
  const mailOptions = {
    from: 'youremail@example.com',
    to: recipient, // Email do cliente
    subject: 'Nota de Débito Gerada',
    text: `Caro Cliente,\n\nSegue em anexo a nota de débito gerada:\n\n${debitNote}\n\nAtenciosamente,\nSua Empresa`,
    attachments: attachments.map((attachment) => ({
      filename: path.basename(attachment),
      path: attachment, // Caminho para o arquivo
    })),
  };

  // Envio do e-mail
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
};
