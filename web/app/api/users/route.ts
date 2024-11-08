import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     console.log("OLA")
//     try {
//       const users = await prisma.user.findMany();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch users' });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
      } catch (error) {
        return NextResponse.json([]);
        
      }
}