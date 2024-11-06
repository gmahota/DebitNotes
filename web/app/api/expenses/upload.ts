import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Cria o diretório de upload, se não existir
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Mock para atualizar a despesa
const updateExpenseStatus = (expenseId: string, fileUrl: string) => {
  // Esta função simula a atualização do status e comprovativo da despesa
  // Em um ambiente real, você usaria uma chamada de banco de dados para salvar esses dados
  return {
    success: true,
    expense: {
      id: expenseId,
      fileUrl,
      status: 'Justificado',
    },
  };
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const expenseId = formData.get('expenseId') as string;

  if (!file || !expenseId) {
    return NextResponse.json({ error: 'Arquivo ou ID da despesa não fornecido' }, { status: 400 });
  }

  const uniqueFileName = `${expenseId}-${uuidv4()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFileName);

  // Salva o arquivo
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // URL do comprovativo
  const fileUrl = `/uploads/${uniqueFileName}`;

  // Atualiza o status da despesa para 'Justificado'
  const result = updateExpenseStatus(expenseId, fileUrl);

  return NextResponse.json(result);
}
