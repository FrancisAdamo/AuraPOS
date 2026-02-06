import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export interface ExportData {
  title: string;
  headers: string[];
  data: any[][];
  metadata?: {
    period?: string;
    date?: string;
    total?: string;
  };
}

export function useReportExport() {
  const exportToPDF = (exportData: ExportData) => {
    const doc = new jsPDF();
    
    // Configuración de fuentes
    doc.setFont('helvetica');
    
    // Título
    doc.setFontSize(20);
    doc.text(exportData.title, 20, 20);
    
    // Metadatos
    if (exportData.metadata) {
      doc.setFontSize(10);
      let yPosition = 30;
      
      if (exportData.metadata.period) {
        doc.text(`Período: ${exportData.metadata.period}`, 20, yPosition);
        yPosition += 10;
      }
      
      if (exportData.metadata.date) {
        doc.text(`Fecha: ${exportData.metadata.date}`, 20, yPosition);
        yPosition += 10;
      }
      
      if (exportData.metadata.total) {
        doc.text(`Total: ${exportData.metadata.total}`, 20, yPosition);
      }
    }
    
    // Tabla
    doc.setFontSize(12);
    let yPosition = exportData.metadata ? 60 : 30;
    
    // Headers
    doc.setFont('helvetica', 'bold');
    exportData.headers.forEach((header, index) => {
      const xPosition = 20 + (index * 40);
      doc.text(header, xPosition, yPosition);
    });
    
    // Datos
    doc.setFont('helvetica', 'normal');
    exportData.data.forEach((row) => {
      yPosition += 10;
      if (yPosition > 270) { // Nueva página
        doc.addPage();
        yPosition = 20;
      }
      
      row.forEach((cell, cellIndex) => {
        const xPosition = 20 + (cellIndex * 40);
        doc.text(String(cell), xPosition, yPosition);
      });
    });
    
    // Guardar PDF
    doc.save(`${exportData.title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };
  
  const exportToExcel = (exportData: ExportData) => {
    // Crear worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      [exportData.title],
      [],
      ...exportData.metadata ? [
        exportData.metadata.period ? [`Período: ${exportData.metadata.period}`] : [],
        exportData.metadata.date ? [`Fecha: ${exportData.metadata.date}`] : [],
        exportData.metadata.total ? [`Total: ${exportData.metadata.total}`] : [],
        []
      ] : [],
      exportData.headers,
      ...exportData.data
    ]);
    
    // Crear workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    
    // Ajustar anchos de columna
    const colWidths = exportData.headers.map(() => ({ wch: 15 }));
    ws['!cols'] = colWidths;
    
    // Guardar Excel
    XLSX.writeFile(wb, `${exportData.title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
  };
  
  const exportToCSV = (exportData: ExportData) => {
    const csvContent = [
      exportData.title,
      '',
      ...exportData.metadata ? [
        exportData.metadata.period ? `Período: ${exportData.metadata.period}` : '',
        exportData.metadata.date ? `Fecha: ${exportData.metadata.date}` : '',
        exportData.metadata.total ? `Total: ${exportData.metadata.total}` : '',
        ''
      ] : [],
      exportData.headers.join(','),
      ...exportData.data.map(row => row.join(','))
    ].filter(line => line !== '').join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportData.title.toLowerCase().replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return {
    exportToPDF,
    exportToExcel,
    exportToCSV
  };
}
