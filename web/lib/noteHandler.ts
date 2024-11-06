import { generateDebitNote } from './debitNoteService';

// Simulação de criação de uma nota de débito
const createDebitNote = async () => {
  const clientEmail = 'client@example.com'; // Email do cliente
  // Outros processos para criar a nota de débito
  await generateDebitNote(clientEmail); // Enviar nota de débito por e-mail
};

// Chame createDebitNote quando necessário
createDebitNote();
