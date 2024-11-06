"use client"; // Necessário para permitir o uso de Hooks do React

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ExpenseRequestForm {
  project: string;
  subject: string;
  estimatedValue: number;
  date: string;
  status: string; // Campo para o status da despesa
  receipt: FileList; // Campo para upload de comprovativo
}

const RequestExpensePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseRequestForm>();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const onSubmit = (data: ExpenseRequestForm) => {
    console.log('Requisição de Despesa:', { ...data, receipt: receiptFile });
    // Aqui você pode fazer a lógica de envio do formulário
    // como uma requisição API ou armazená-lo em um estado global.
  };

  const handleReceiptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setReceiptFile(event.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Requisição de Despesas</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Projeto</label>
          <input
            type="text"
            {...register('project', { required: true })}
            className={`mt-1 block w-full border rounded-md p-2 ${errors.project ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.project && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assunto</label>
          <input
            type="text"
            {...register('subject', { required: true })}
            className={`mt-1 block w-full border rounded-md p-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.subject && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valor Estimado (MZN)</label>
          <input
            type="number"
            {...register('estimatedValue', { required: true, min: 0 })}
            className={`mt-1 block w-full border rounded-md p-2 ${errors.estimatedValue ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.estimatedValue && <p className="text-red-500 text-sm">Este campo é obrigatório e deve ser maior ou igual a zero.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className={`mt-1 block w-full border rounded-md p-2 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.date && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status da Despesa</label>
          <select
            {...register('status', { required: true })}
            className={`mt-1 block w-full border rounded-md p-2 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione um status</option>
            <option value="Pendente">Pendente</option>
            <option value="Aprovada">Aprovada</option>
            <option value="Justificada">Justificada</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload de Comprovativo</label>
          <input
            type="file"
            accept="image/*,application/pdf" // Aceitar imagens e PDFs
            onChange={handleReceiptChange}
            className={`mt-1 block w-full border rounded-md p-2 ${!receiptFile ? 'border-gray-300' : 'border-blue-300'}`}
          />
          {receiptFile && <p className="text-sm text-gray-600">Arquivo: {receiptFile.name}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Enviar Requisição</button>
      </form>
    </div>
  );
};

export default RequestExpensePage;
