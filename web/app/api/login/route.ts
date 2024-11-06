// app/api/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  { id: '1', email: 'cliente1@example.com', password: bcrypt.hashSync('password123', 8), projectId: 'project1' },
  { id: '2', email: 'cliente2@example.com', password: bcrypt.hashSync('password456', 8), projectId: 'project2' },
];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = users.find((user) => user.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, projectId: user.projectId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}
