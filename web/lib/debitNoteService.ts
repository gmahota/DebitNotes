import { sendDebitNoteEmail } from './emailService';

// Função simulada para gerar uma nota de débito
export const generateDebitNote = async (recipient: string) => {
  const debitNote = "Nota de débito referente ao projeto XYZ"; // Resumo da nota de débito
  const attachments = [
    'caminho/para/comprovativo1.pdf', // Caminho para comprovativos
    'caminho/para/comprovativo2.pdf',
  ];

  // Chama a função para enviar o e-mail com a nota de débito e anexos
  await sendDebitNoteEmail(recipient, debitNote, attachments);
};
