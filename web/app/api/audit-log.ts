// api/audit-log.ts
import { NextApiRequest, NextApiResponse } from 'next';
//import { prisma } from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { expenseId, action, changedBy, changes, justification } = req.body;

//     try {
//       const log = await prisma.auditLog.create({
//         data: {
//           expenseId,
//           action,
//           changedBy,
//           changes: JSON.stringify(changes),
//           justification,
//           createdAt: new Date(),
//         },
//       });
//       res.status(200).json(log);
//     } catch (error) {
//       res.status(500).json({ message: 'Erro ao registrar log de auditoria.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Método não permitido.' });
//   }
    res.status(200);
}
