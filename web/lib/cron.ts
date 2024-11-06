import cron from 'node-cron';
import { sendMonthlyReport } from './notifications'; // Importa a função que envia o relatório

// Agendar tarefa para enviar relatórios mensalmente
cron.schedule('0 0 1 * *', () => {
  console.log('Enviando relatórios mensais...');
  sendMonthlyReport(); // Chama a função para enviar o relatório
});
