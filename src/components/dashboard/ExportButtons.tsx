import { Download, FileText, Table } from 'lucide-react';
import { useReportExport, type ExportData } from '../../hooks/useReportExport';

interface ExportButtonsProps {
  exportData: ExportData;
  className?: string;
}

export function ExportButtons({ exportData, className = '' }: ExportButtonsProps) {
  const { exportToPDF, exportToExcel, exportToCSV } = useReportExport();

  const handleExportPDF = () => {
    exportToPDF(exportData);
  };

  const handleExportExcel = () => {
    exportToExcel(exportData);
  };

  const handleExportCSV = () => {
    exportToCSV(exportData);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors border border-red-200"
        title="Exportar a PDF"
      >
        <FileText size={16} />
        PDF
      </button>
      
      <button
        onClick={handleExportExcel}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors border border-green-200"
        title="Exportar a Excel"
      >
        <Table size={16} />
        Excel
      </button>
      
      <button
        onClick={handleExportCSV}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
        title="Exportar a CSV"
      >
        <Download size={16} />
        CSV
      </button>
    </div>
  );
}
