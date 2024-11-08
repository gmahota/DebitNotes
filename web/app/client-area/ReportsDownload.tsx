// app/client-area/ReportsDownload.tsx
'use client';

import { Button } from "@/components/ui/button"

const ReportsDownload = () => {
    const handleDownload = async (format: 'pdf' | 'csv') => {
        const response = await fetch(`/api/download-report?format=${format}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_despesas.${format}`;
        a.click();
    };

    return (
        <div>
            <h2 className='mb-12'>Relatórios</h2>
            <Button onClick={() => handleDownload('pdf')}>Baixar Relatório em PDF</Button>
            <Button onClick={() => handleDownload('csv')}>Baixar Relatório em CSV</Button>
        </div>
    );
};

export default ReportsDownload;
