import { Lock, DollarSign, AlertCircle, CheckCircle, Plus, Download, History } from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface CashClosureRecord {
  id: string;
  date: string;
  totalBruto: number;
  cash: number;
  card: number;
  transfer: number;
  countedCash: number;
  discrepancy: number;
  discrepancyNote: string;
  withdrawals: Array<{date: string; amount: number; reason: string}>;
}

export default function CashClosing() {
  const [currentStep, setCurrentStep] = useState<'summary' | 'closing' | 'opening' | 'history'>('summary');
  
  // Estado del cierre
  const [isClosed, setIsClosed] = useState(false);
  const [countedCash, setCountedCash] = useState(0);
  const [discrepancyNote, setDiscrepancyNote] = useState('');
  
  // Estado de apertura
  const [isOpened, setIsOpened] = useState(false);
  const [confirmInitialBalance, setConfirmInitialBalance] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalReason, setWithdrawalReason] = useState('');
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState<Array<{date: string; amount: number; reason: string}>>([]);
  
  // Historial de cierres
  const [closureHistory, setClosureHistory] = useState<CashClosureRecord[]>([
    {
      id: 'closure-001',
      date: '17 de enero de 2026',
      totalBruto: 3420,
      cash: 1150,
      card: 1820,
      transfer: 450,
      countedCash: 1155,
      discrepancy: 5,
      discrepancyNote: 'Monedas encontradas en fondo de caja',
      withdrawals: []
    },
    {
      id: 'closure-002',
      date: '16 de enero de 2026',
      totalBruto: 3150,
      cash: 1080,
      card: 1650,
      transfer: 420,
      countedCash: 1080,
      discrepancy: 0,
      discrepancyNote: '',
      withdrawals: []
    }
  ]);

  const salesData = {
    totalBruto: 2845,
    cash: 950,
    card: 1375,
    transfer: 520,
    discounts: 45,
    netTotal: 2800,
  };

  const closureDate = new Date();
  const discrepancy = countedCash - salesData.cash;
  const hasDiscrepancy = Math.abs(discrepancy) > 0;

  const handleCompleteClosure = () => {
    if (countedCash === 0) {
      alert('Por favor ingresa el monto de efectivo contado');
      return;
    }
    
    if (hasDiscrepancy && !discrepancyNote.trim()) {
      alert('Por favor explica la discrepancia antes de cerrar');
      return;
    }
    
    // Guardar en el historial
    const newRecord: CashClosureRecord = {
      id: `closure-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }),
      totalBruto: salesData.totalBruto,
      cash: salesData.cash,
      card: salesData.card,
      transfer: salesData.transfer,
      countedCash,
      discrepancy,
      discrepancyNote,
      withdrawals: withdrawalHistory,
    };
    
    setClosureHistory([newRecord, ...closureHistory]);
    setIsClosed(true);
    setCurrentStep('opening');
  };

  const handleCompleteOpening = () => {
    if (!confirmInitialBalance) {
      alert('Por favor confirma el saldo inicial');
      return;
    }
    setIsOpened(true);
    setCurrentStep('summary');
  };

  const downloadPDF = () => {
    const doc = new (jsPDF as any)();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // ===== ENCABEZADO PROFESIONAL =====
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, contentWidth, 35, 'S');
    
    doc.setFillColor(59, 130, 246);
    doc.rect(margin, yPosition, contentWidth, 8, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('', 'bold');
    doc.text('CIERRE DE CAJA', pageWidth / 2, yPosition + 6, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('', 'normal');
    doc.text('AuraPOS - Enterprise Resource Planning', pageWidth / 2, yPosition + 15, { align: 'center' });
    doc.text(`Documento generado: ${new Date().toLocaleString('es-ES')}`, pageWidth / 2, yPosition + 22, { align: 'center' });
    doc.text(`ID: Cierre_${new Date().toISOString().split('T')[0]}`, pageWidth / 2, yPosition + 29, { align: 'center' });
    
    yPosition += 42;

    // ===== INFORMACIÓN GENERAL =====
    doc.setFontSize(11);
    doc.setFont('', 'bold');
    doc.setTextColor(55, 53, 47);
    doc.text('INFORMACIÓN GENERAL', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(9);
    doc.setFont('', 'normal');
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = today.toLocaleTimeString('es-ES');

    doc.text(`Fecha de cierre: ${dateStr}`, margin + 2, yPosition);
    yPosition += 5;
    doc.text(`Hora: ${timeStr}`, margin + 2, yPosition);
    yPosition += 8;

    // ===== RESUMEN DE VENTAS =====
    yPosition += 3;
    doc.setFontSize(11);
    doc.setFont('', 'bold');
    doc.text('RESUMEN DE VENTAS DEL DÍA', margin, yPosition);
    yPosition += 8;

    // Tabla de ventas
    const ventasData: string[][] = [
      ['Concepto', 'Monto', 'Detalle'],
      ['Ventas brutas', `$${salesData.totalBruto.toLocaleString()}`, 'Total antes de descuentos'],
      ['Descuentos', `$${salesData.discounts.toLocaleString()}`, 'Promociones y ofertas'],
      ['Total neto', `$${salesData.netTotal.toLocaleString()}`, 'Ingresos finales'],
    ];

    doc.setFontSize(9);
    doc.setFont('', 'bold');
    doc.setFillColor(219, 234, 254);
    ventasData.forEach((row, idx) => {
      if (idx === 0) {
        doc.rect(margin, yPosition, contentWidth, 6, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(String(row[0] ?? ''), margin + 2, yPosition + 4);
        doc.text(String(row[1] ?? ''), margin + 60, yPosition + 4);
        doc.text(String(row[2] ?? ''), margin + 100, yPosition + 4);
      } else {
        doc.setFont('', 'normal');
        doc.setTextColor(55, 53, 47);
        if (idx === ventasData.length - 1) {
          doc.setFont('', 'bold');
          doc.setFillColor(243, 244, 246);
          doc.rect(margin, yPosition, contentWidth, 6, 'F');
        }
        doc.text(String(row[0] ?? ''), margin + 2, yPosition + 4);
        doc.text(String(row[1] ?? ''), margin + 60, yPosition + 4);
        doc.text(String(row[2] ?? ''), margin + 100, yPosition + 4);
      }
      yPosition += 6;
    });

    yPosition += 8;

    // ===== MÉTODOS DE PAGO =====
    doc.setFontSize(11);
    doc.setFont('', 'bold');
    doc.setTextColor(55, 53, 47);
    doc.text('DESGLOSE POR MÉTODO DE PAGO', margin, yPosition);
    yPosition += 8;

    // Tabla de métodos de pago
    const paymentMethods: string[][] = [
      ['Método', 'Monto', '%', 'Detalle'],
      ['Efectivo', `$${salesData.cash.toLocaleString()}`, `${((salesData.cash / salesData.totalBruto) * 100).toFixed(1)}%`, 'Dinero en efectivo'],
      ['Tarjeta', `$${salesData.card.toLocaleString()}`, `${((salesData.card / salesData.totalBruto) * 100).toFixed(1)}%`, 'Débito/Crédito'],
      ['Transferencia', `$${salesData.transfer.toLocaleString()}`, `${((salesData.transfer / salesData.totalBruto) * 100).toFixed(1)}%`, 'Transferencias'],
      ['TOTAL', `$${salesData.totalBruto.toLocaleString()}`, '100.0%', 'Total general'],
    ];

    doc.setFontSize(9);
    doc.setFont('', 'bold');
    doc.setFillColor(219, 234, 254);
    paymentMethods.forEach((row, idx) => {
      if (idx === 0) {
        doc.rect(margin, yPosition, contentWidth, 6, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(String(row[0] ?? ''), margin + 2, yPosition + 4);
        doc.text(String(row[1] ?? ''), margin + 70, yPosition + 4);
        doc.text(String(row[2] ?? ''), margin + 110, yPosition + 4);
        doc.text(String(row[3] ?? ''), margin + 130, yPosition + 4);
      } else {
        doc.setFont('', 'normal');
        doc.setTextColor(55, 53, 47);
        if (idx === paymentMethods.length - 1) {
          doc.setFont('', 'bold');
          doc.setFillColor(243, 244, 246);
          doc.rect(margin, yPosition, contentWidth, 6, 'F');
        }
        doc.text(String(row[0] ?? ''), margin + 2, yPosition + 4);
        doc.text(String(row[1] ?? ''), margin + 70, yPosition + 4);
        doc.text(String(row[2] ?? ''), margin + 110, yPosition + 4);
        doc.text(String(row[3] ?? ''), margin + 130, yPosition + 4);
      }
      yPosition += 6;
    });

    yPosition += 8;

    // ===== RECONCILIACIÓN DE EFECTIVO =====
    doc.setFontSize(11);
    doc.setFont('', 'bold');
    doc.setTextColor(55, 53, 47);
    doc.text('RECONCILIACIÓN DE EFECTIVO', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont('', 'normal');
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(229, 229, 229);
    doc.setLineWidth(0.3);

    const reconciliation: string[][] = [
      ['Efectivo esperado (según ventas)', `$${salesData.cash.toLocaleString()}`],
      ['Efectivo contado físicamente', `$${countedCash.toLocaleString()}`],
    ];

    reconciliation.forEach((row) => {
      doc.rect(margin, yPosition, contentWidth, 6, 'S');
      doc.text(String(row[0] ?? ''), margin + 2, yPosition + 4);
      doc.text(String(row[1] ?? ''), pageWidth - margin - 2, yPosition + 4, { align: 'right' });
      yPosition += 6;
    });

    // Resultado
    const discrepancyValue = countedCash - salesData.cash;
    const isBalanced = Math.abs(discrepancyValue) < 0.01;
    const discrepancyColor: number[] = isBalanced ? [16, 185, 129] : discrepancyValue > 0 ? [245, 158, 11] : [239, 68, 68];
    
    doc.setFillColor(discrepancyColor[0], discrepancyColor[1], discrepancyColor[2]);
    doc.rect(margin, yPosition, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('', 'bold');
    
    let discrepancyStatus = '';
    if (isBalanced) {
      discrepancyStatus = '✓ BALANCEADO - Diferencia: $0.00';
    } else if (discrepancyValue > 0) {
      discrepancyStatus = `⚠ SOBRANTE: +$${discrepancyValue.toFixed(2)}`;
    } else {
      discrepancyStatus = `⚠ FALTANTE: -$${Math.abs(discrepancyValue).toFixed(2)}`;
    }
    
    doc.text(discrepancyStatus, pageWidth / 2, yPosition + 5, { align: 'center' });
    yPosition += 12;

    // Nota de discrepancia si existe
    if (discrepancyNote && !isBalanced) {
      doc.setTextColor(180, 83, 9);
      doc.setFont('', 'bold');
      doc.setFontSize(9);
      doc.text('NOTA DE DISCREPANCIA:', margin, yPosition);
      yPosition += 5;
      
      doc.setTextColor(0, 0, 0);
      doc.setFont('', 'normal');
      const noteLines = (doc.splitTextToSize(discrepancyNote, contentWidth - 4) || []) as string[];
      noteLines.forEach((line: string) => {
        doc.text(line, margin + 2, yPosition);
        yPosition += 4;
      });
      yPosition += 3;
    }

    // ===== RETIROS REGISTRADOS =====
    if (withdrawalHistory.length > 0) {
      yPosition += 5;
      doc.setFontSize(11);
      doc.setFont('', 'bold');
      doc.setTextColor(55, 53, 47);
      doc.text('RETIROS REGISTRADOS', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(8);
      doc.setFont('', 'bold');
      doc.setFillColor(219, 234, 254);
      const withdrawalHeaders: string[] = ['Fecha / Hora', 'Monto', 'Concepto'];
      doc.text(String(withdrawalHeaders[0] ?? ''), margin + 2, yPosition + 4);
      doc.text(String(withdrawalHeaders[1] ?? ''), margin + 70, yPosition + 4);
      doc.text(String(withdrawalHeaders[2] ?? ''), margin + 100, yPosition + 4);
      doc.rect(margin, yPosition, contentWidth, 6, 'F');
      yPosition += 6;

      doc.setFont('', 'normal');
      let totalWithdrawals = 0;
      withdrawalHistory.forEach(withdrawal => {
        if (yPosition > pageHeight - 25) {
          doc.addPage();
          yPosition = margin;
        }
        doc.setTextColor(55, 53, 47);
        doc.text(String(withdrawal.date ?? ''), margin + 2, yPosition + 4);
        doc.text(`$${withdrawal.amount.toLocaleString()}`, margin + 70, yPosition + 4);
        doc.text(String(withdrawal.reason ?? ''), margin + 100, yPosition + 4);
        doc.setDrawColor(229, 229, 229);
        doc.setLineWidth(0.2);
        doc.line(margin, yPosition + 5.5, pageWidth - margin, yPosition + 5.5);
        yPosition += 6;
        totalWithdrawals += withdrawal.amount;
      });

      doc.setFont('', 'bold');
      doc.setFillColor(243, 244, 246);
      doc.rect(margin, yPosition, contentWidth, 6, 'F');
      doc.text('TOTAL RETIROS', margin + 2, yPosition + 4);
      doc.text(`$${totalWithdrawals.toLocaleString()}`, margin + 70, yPosition + 4);
      yPosition += 10;
    }

    // ===== RESUMEN EJECUTIVO =====
    yPosition += 5;
    doc.setFontSize(11);
    doc.setFont('', 'bold');
    doc.setTextColor(55, 53, 47);
    doc.text('RESUMEN EJECUTIVO', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont('', 'normal');
    const summary: string[][] = [
      [`Ventas totales del día: $${salesData.totalBruto.toLocaleString()}`, `Efectivo en caja verificado: $${countedCash.toLocaleString()}`],
    ];

    summary.forEach((row: string[]) => {
      doc.text(String(row[0] ?? ''), margin + 2, yPosition);
      doc.text(String(row[1] ?? ''), pageWidth / 2 + 20, yPosition);
      yPosition += 5;
    });

    // ===== CERTIFICACIÓN Y PIE DE PÁGINA =====
    yPosition = pageHeight - 35;
    
    doc.setDrawColor(229, 229, 229);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 5;
    doc.setFontSize(8);
    doc.setFont('', 'bold');
    doc.setTextColor(55, 53, 47);
    doc.text('CERTIFICACIÓN', margin, yPosition);
    
    yPosition += 4;
    doc.setFont('', 'normal');
    doc.setFontSize(7);
    const certText = 'Este documento certifica que el cierre de caja ha sido realizado de acuerdo con los procedimientos establecidos por la administración.';
    const certLines = (doc.splitTextToSize(certText, contentWidth - 4) || []) as string[];
    certLines.forEach((line: string) => {
      doc.text(line, margin + 2, yPosition);
      yPosition += 3;
    });

    yPosition += 2;
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(7);
    doc.text(`Generado por AuraPOS v1.0.0 • ${new Date().toLocaleString('es-ES')}`, pageWidth / 2, pageHeight - 5, { align: 'center' });

    doc.save(`Cierre_Caja_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadExcel = () => {
    const ws_data = [
      [''],
      ['╔════════════════════════════════════════════════════════╗'],
      ['║                      CIERRE DE CAJA                    ║'],
      ['║                      AuraPOS ERP                       ║'],
      ['╚════════════════════════════════════════════════════════╝'],
      [''],
      ['INFORMACIÓN GENERAL'],
      ['Fecha de cierre', new Date().toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })],
      ['Hora de generación', new Date().toLocaleTimeString('es-ES')],
      ['Documento', `Cierre_Caja_${new Date().toISOString().split('T')[0]}`],
      [''],
      [''],
      ['═══════════════════════════════════════════════════════'],
      ['RESUMEN DE VENTAS DEL DÍA'],
      ['═══════════════════════════════════════════════════════'],
      [''],
      ['Concepto', 'Monto', '', 'Detalle'],
      ['Ventas brutas', `$${salesData.totalBruto.toLocaleString()}`, '', 'Total antes de descuentos'],
      ['Descuentos aplicados', `$${salesData.discounts.toLocaleString()}`, '', 'Promociones y ofertas'],
      ['───────────────────', '─────────────', '', ''],
      ['Total neto de ventas', `$${salesData.netTotal.toLocaleString()}`, '', 'Ingresos finales'],
      [''],
      [''],
      ['═══════════════════════════════════════════════════════'],
      ['MÉTODOS DE PAGO'],
      ['═══════════════════════════════════════════════════════'],
      [''],
      ['Método de pago', 'Monto', 'Porcentaje', 'Detalles'],
      ['Efectivo', `$${salesData.cash.toLocaleString()}`, `${((salesData.cash / salesData.totalBruto) * 100).toFixed(1)}%`, 'Dinero en efectivo recibido'],
      ['Tarjeta de crédito/débito', `$${salesData.card.toLocaleString()}`, `${((salesData.card / salesData.totalBruto) * 100).toFixed(1)}%`, 'Pagos con tarjeta procesados'],
      ['Transferencia bancaria', `$${salesData.transfer.toLocaleString()}`, `${((salesData.transfer / salesData.totalBruto) * 100).toFixed(1)}%`, 'Transferencias recibidas'],
      ['───────────────────────', '─────────────', '─────────', ''],
      ['TOTAL', `$${salesData.totalBruto.toLocaleString()}`, '100.0%', ''],
      [''],
      [''],
      ['═══════════════════════════════════════════════════════'],
      ['CONTEO Y RECONCILIACIÓN DE EFECTIVO'],
      ['═══════════════════════════════════════════════════════'],
      [''],
      ['Concepto', 'Monto', '', 'Estado'],
      ['Efectivo esperado (según ventas)', `$${salesData.cash.toLocaleString()}`, '', 'De registro de sistema'],
      ['Efectivo contado físicamente', `$${countedCash.toLocaleString()}`, '', 'Verificado en caja'],
      [''],
      [
        'Diferencia',
        `$${(countedCash - salesData.cash).toFixed(2)}`,
        '',
        countedCash === salesData.cash 
          ? '✓ BALANCEADO' 
          : countedCash > salesData.cash 
            ? '⚠ SOBRANTE' 
            : '⚠ FALTANTE'
      ],
      [''],
      ...(discrepancyNote ? [
        ['NOTA DE DISCREPANCIA'],
        [discrepancyNote],
        [''],
      ] : []),
      [''],
      ...(withdrawalHistory.length > 0 ? [
        ['═══════════════════════════════════════════════════════'],
        ['RETIROS REGISTRADOS'],
        ['═══════════════════════════════════════════════════════'],
        [''],
        ['Fecha y hora', 'Monto retirado', 'Concepto/Motivo'],
        ...withdrawalHistory.map(w => [w.date, `$${w.amount.toLocaleString()}`, w.reason]),
        [''],
        ['TOTAL RETIROS', `$${withdrawalHistory.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}`, ''],
        [''],
      ] : []),
      [''],
      ['═══════════════════════════════════════════════════════'],
      ['RESUMEN EJECUTIVO'],
      ['═══════════════════════════════════════════════════════'],
      [''],
      ['Ventas totales del día', `$${salesData.totalBruto.toLocaleString()}`],
      ['Efectivo en caja (verificado)', `$${countedCash.toLocaleString()}`],
      [
        'Estado de reconciliación',
        countedCash === salesData.cash
          ? '✓ BALANCEADO - Todas las cifras coinciden'
          : countedCash > salesData.cash
            ? `⚠ SOBRANTE DE $${(countedCash - salesData.cash).toFixed(2)}`
            : `⚠ FALTANTE DE $${Math.abs(countedCash - salesData.cash).toFixed(2)}`
      ],
      [''],
      [''],
      ['INFORMACIÓN DEL SISTEMA'],
      ['Generado por', 'AuraPOS Enterprise Resource Planning'],
      ['Sistema operativo', 'Web Application'],
      ['Versión', '1.0.0'],
      [''],
      ['CERTIFICACIÓN'],
      ['Este documento certifica que el cierre de caja ha sido realizado de acuerdo con'],
      ['los procedimientos establecidos y aprobados por la administración.'],
      [''],
      ['Fecha de generación: ' + new Date().toLocaleString('es-ES')],
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    // Configuración de estilos y columnas
    ws['!cols'] = [
      { wch: 35 },
      { wch: 18 },
      { wch: 12 },
      { wch: 40 }
    ];

    // Configurar altura de filas para las líneas decorativas
    ws['!rows'] = [];
    for (let i = 0; i < ws_data.length; i++) {
      if (ws_data[i][0]?.includes('╔') || ws_data[i][0]?.includes('═══')) {
        ws['!rows'][i] = { hpt: 14 };
      } else if (ws_data[i][0] === '') {
        ws['!rows'][i] = { hpt: 8 };
      }
    }
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cierre de Caja');
    XLSX.writeFile(wb, `Cierre_Caja_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const addWithdrawal = () => {
    if (withdrawalAmount <= 0 || !withdrawalReason.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    const newWithdrawal = {
      date: new Date().toLocaleString('es-ES'),
      amount: withdrawalAmount,
      reason: withdrawalReason,
    };
    
    setWithdrawalHistory([...withdrawalHistory, newWithdrawal]);
    setWithdrawalAmount(0);
    setWithdrawalReason('');
    setShowWithdrawalForm(false);
  };


  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#37352f',
          margin: 0,
        }}>Cierre y apertura de caja</h1>
        <p style={{
          color: '#9ca3af',
          marginTop: '0.25rem',
          margin: 0,
        }}>Gestiona el cierre diario y apertura del siguiente día</p>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid #e5e5e5',
        paddingBottom: '1rem',
      }}>
        <button
          onClick={() => setCurrentStep('summary')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentStep === 'summary' ? '#3b82f6' : 'transparent',
            color: currentStep === 'summary' ? '#ffffff' : '#37352f',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentStep !== 'summary') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (currentStep !== 'summary') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          📊 Resumen
        </button>
        <button
          onClick={() => setCurrentStep('closing')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentStep === 'closing' ? '#3b82f6' : 'transparent',
            color: currentStep === 'closing' ? '#ffffff' : '#37352f',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentStep !== 'closing') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (currentStep !== 'closing') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          🔒 Cierre
        </button>
        <button
          onClick={() => setCurrentStep('opening')}
          disabled={!isClosed}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentStep === 'opening' ? '#3b82f6' : 'transparent',
            color: currentStep === 'opening' ? '#ffffff' : isClosed ? '#37352f' : '#9ca3af',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: isClosed ? 'pointer' : 'not-allowed',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            opacity: isClosed ? 1 : 0.5,
          }}
          onMouseEnter={(e) => {
            if (currentStep !== 'opening' && isClosed) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (currentStep !== 'opening' && isClosed) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          🟢 Apertura
        </button>
        <button
          onClick={() => setCurrentStep('history')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentStep === 'history' ? '#3b82f6' : 'transparent',
            color: currentStep === 'history' ? '#ffffff' : '#37352f',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            marginLeft: 'auto',
          }}
          onMouseEnter={(e) => {
            if (currentStep !== 'history') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (currentStep !== 'history') {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          <History size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Historial
        </button>
      </div>

      {/* STEP 1: SUMMARY */}
      {currentStep === 'summary' && (
        <div style={cardStyle}>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header */}
            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #e5e5e5' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#37352f',
                margin: 0,
              }}>Resumen del día</h2>
              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginTop: '0.5rem',
                margin: 0,
              }}>
                {closureDate.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Totales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0, marginBottom: '0.5rem', fontWeight: 600 }}>VENTAS BRUTAS</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0 }}>
                  ${salesData.totalBruto.toLocaleString()}
                </p>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0, marginBottom: '0.5rem', fontWeight: 600 }}>DESCUENTOS</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                  -${salesData.discounts.toLocaleString()}
                </p>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0, marginBottom: '0.5rem', fontWeight: 600 }}>TOTAL NETO</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                  ${salesData.netTotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Métodos de pago */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#37352f', margin: '0 0 1rem 0' }}>Desglose por Método de Pago</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={cardStyle}>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', margin: 0, marginBottom: '0.5rem' }}>EFECTIVO</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0, marginBottom: '0.5rem' }}>
                      ${salesData.cash.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      {((salesData.cash / salesData.totalBruto) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
                <div style={cardStyle}>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', margin: 0, marginBottom: '0.5rem' }}>TARJETA</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0, marginBottom: '0.5rem' }}>
                      ${salesData.card.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      {((salesData.card / salesData.totalBruto) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
                <div style={cardStyle}>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', margin: 0, marginBottom: '0.5rem' }}>TRANSFERENCIA</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0, marginBottom: '0.5rem' }}>
                      ${salesData.transfer.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      {((salesData.transfer / salesData.totalBruto) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Historial de retiros */}
            {withdrawalHistory.length > 0 && (
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#37352f', margin: '0 0 1rem 0' }}>Retiros registrados</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {withdrawalHistory.map((w, idx) => (
                    <div key={idx} style={{
                      padding: '0.75rem',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 500, color: '#854d0e', fontSize: '0.875rem' }}>{w.reason}</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#854d0e' }}>{w.date}</p>
                      </div>
                      <p style={{ margin: 0, fontWeight: 600, color: '#854d0e' }}>-${w.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: CLOSING */}
      {currentStep === 'closing' && (
        <div style={cardStyle}>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0 }}>
              Cierre de Caja
            </h2>

            {/* Efectivo calculado por sistema */}
            <div style={{
              padding: '1rem',
              backgroundColor: '#dbeafe',
              border: '1px solid #bfdbfe',
              borderRadius: '0.25rem',
            }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e40af', margin: 0, marginBottom: '0.5rem' }}>
                💻 Sistema calculó:
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
                ${salesData.cash.toLocaleString()}
              </p>
            </div>

            {/* Input para efectivo contado */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#37352f', marginBottom: '0.5rem', margin: 0 }}>
                💵 Efectivo contado manualmente:
              </label>
              <input
                type="number"
                value={countedCash === 0 ? '' : countedCash}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setCountedCash(0);
                  } else {
                    setCountedCash(parseFloat(e.target.value) || 0);
                  }
                }}
                placeholder="Ingresa el monto contado"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#37352f',
                }}
              />
            </div>

            {/* Comparación */}
            {countedCash > 0 && (
              <div style={{
                padding: '1rem',
                backgroundColor: hasDiscrepancy ? '#fee2e2' : '#dcfce7',
                border: `1px solid ${hasDiscrepancy ? '#fecaca' : '#bbf7d0'}`,
                borderRadius: '0.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {hasDiscrepancy ? (
                    <AlertCircle size={18} color="#dc2626" />
                  ) : (
                    <CheckCircle size={18} color="#16a34a" />
                  )}
                  <p style={{
                    margin: 0,
                    fontWeight: 600,
                    color: hasDiscrepancy ? '#991b1b' : '#166534',
                    fontSize: '0.875rem',
                  }}>
                    {hasDiscrepancy ? 'DISCREPANCIA DETECTADA' : 'MONTO COINCIDE ✓'}
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: hasDiscrepancy ? '#991b1b' : '#166534' }}>
                  Diferencia: {discrepancy >= 0 ? '+' : ''} ${Math.abs(discrepancy).toFixed(2)}
                </p>
              </div>
            )}

            {/* Nota de discrepancia */}
            {hasDiscrepancy && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#37352f', marginBottom: '0.5rem', margin: 0 }}>
                  📝 Nota de Discrepancia (requerida):
                </label>
                <textarea
                  value={discrepancyNote}
                  onChange={(e) => setDiscrepancyNote(e.target.value)}
                  placeholder="Explica por qué hay diferencia (ej: cliente devolvió producto, error de cálculo, etc.)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.25rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.875rem',
                    color: '#37352f',
                    minHeight: '4rem',
                    resize: 'none',
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {/* Retiros */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid #e5e5e5',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#37352f', margin: 0 }}>Retiros de efectivo</h3>
                <button
                  onClick={() => setShowWithdrawalForm(!showWithdrawalForm)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f3f4f6',
                    color: '#37352f',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                >
                  <Plus size={16} />
                  Agregar retiro
                </button>
              </div>

              {showWithdrawalForm && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  <input
                    type="number"
                    placeholder="Monto a retirar"
                    value={withdrawalAmount === 0 ? '' : withdrawalAmount}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setWithdrawalAmount(0);
                      } else {
                        setWithdrawalAmount(parseFloat(e.target.value) || 0);
                      }
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.25rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Motivo del retiro"
                    value={withdrawalReason}
                    onChange={(e) => setWithdrawalReason(e.target.value)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.25rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={addWithdrawal}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      Registrar
                    </button>
                    <button
                      onClick={() => setShowWithdrawalForm(false)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#f3f4f6',
                        color: '#37352f',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {withdrawalHistory.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {withdrawalHistory.map((w, idx) => (
                    <div key={idx} style={{
                      padding: '0.75rem',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 500, color: '#854d0e', fontSize: '0.875rem' }}>{w.reason}</p>
                      </div>
                      <p style={{ margin: 0, fontWeight: 600, color: '#854d0e' }}>-${w.amount}</p>
                    </div>
                  ))}
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#37352f',
                    textAlign: 'right',
                  }}>
                    Total retiros: -${withdrawalHistory.reduce((sum, w) => sum + w.amount, 0).toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Botón cierre */}
            <button
              onClick={handleCompleteClosure}
              disabled={isClosed || countedCash === 0}
              style={{
                padding: '1rem',
                backgroundColor: isClosed ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: isClosed ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isClosed) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                if (!isClosed) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3b82f6';
              }}
            >
              {isClosed ? (
                <>
                  <Lock size={20} />
                  Cierre Completado
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Confirmar Cierre
                </>
              )}
            </button>

            {/* Botones de descarga */}
            {isClosed && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={downloadPDF}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    minWidth: '150px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#10b981';
                  }}
                >
                  <Download size={20} />
                  Descargar PDF
                </button>

                <button
                  onClick={downloadExcel}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    minWidth: '150px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3b82f6';
                  }}
                >
                  <Download size={20} />
                  Descargar Excel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: OPENING */}
      {currentStep === 'opening' && isClosed && (
        <div style={cardStyle}>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0 }}>
              Apertura de Caja - Día Siguiente
            </h2>

            {/* Información de cierre anterior */}
            <div style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e5e5',
              borderRadius: '0.25rem',
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#9ca3af' }}>
                Cierre del día anterior:
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#37352f' }}>
                Efectivo contado: <span style={{ fontWeight: 'bold' }}>${countedCash.toLocaleString()}</span>
              </p>
              {discrepancy !== 0 && (
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#37352f' }}>
                  Discrepancia: <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                    {discrepancy > 0 ? '+' : ''} ${discrepancy.toFixed(2)}
                  </span>
                </p>
              )}
            </div>

            {/* Saldo inicial a confirmar */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#37352f', margin: '0 0 1rem 0' }}>
                Confirmación de saldo inicial
              </h3>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                border: '1px solid #dcfce7',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
              }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#166534', fontWeight: 600 }}>
                  Saldo a confirmar como inicial:
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                  ${countedCash.toLocaleString()}
                </p>
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e5e5',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              >
                <input
                  type="checkbox"
                  checked={confirmInitialBalance}
                  onChange={(e) => setConfirmInitialBalance(e.target.checked)}
                  style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', color: '#37352f', fontWeight: 500 }}>
                  Confirmo que el saldo inicial es correcto
                </span>
              </label>
            </div>

            {/* Registro de retiros del dueño */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid #e5e5e5',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#37352f', margin: 0 }}>
                  💰 Retiro del Dueño
                </h3>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginBottom: '1rem',
                margin: 0,
              }}>
                Si el dueño retiró efectivo, regístralo aquí:
              </p>

              {showWithdrawalForm && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  <input
                    type="number"
                    placeholder="Monto retirado por el dueño"
                    value={withdrawalAmount === 0 ? '' : withdrawalAmount}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setWithdrawalAmount(0);
                      } else {
                        setWithdrawalAmount(parseFloat(e.target.value) || 0);
                      }
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.25rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Motivo (ej: retiro personal, gasto de operación, etc.)"
                    value={withdrawalReason}
                    onChange={(e) => setWithdrawalReason(e.target.value)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.25rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={addWithdrawal}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      Registrar retiro
                    </button>
                    <button
                      onClick={() => setShowWithdrawalForm(false)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#f3f4f6',
                        color: '#37352f',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {!showWithdrawalForm && (
                <button
                  onClick={() => setShowWithdrawalForm(true)}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#f3f4f6',
                    color: '#37352f',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                >
                  <Plus size={16} />
                  Registrar Retiro del Dueño
                </button>
              )}

              {withdrawalHistory.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#37352f', margin: 0, marginBottom: '0.5rem' }}>
                    Retiros registrados:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {withdrawalHistory.map((w, idx) => (
                      <div key={idx} style={{
                        padding: '0.75rem',
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fecaca',
                        borderRadius: '0.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 500, color: '#991b1b', fontSize: '0.875rem' }}>{w.reason}</p>
                        </div>
                        <p style={{ margin: 0, fontWeight: 600, color: '#991b1b' }}>-${w.amount}</p>
                      </div>
                    ))}
                    <p style={{
                      margin: '0.5rem 0 0 0',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#37352f',
                      textAlign: 'right',
                    }}>
                      Total retiros: -${withdrawalHistory.reduce((sum, w) => sum + w.amount, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Botón apertura */}
            <button
              onClick={handleCompleteOpening}
              disabled={isOpened}
              style={{
                padding: '1rem',
                backgroundColor: isOpened ? '#9ca3af' : '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: isOpened ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isOpened) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#15803d';
              }}
              onMouseLeave={(e) => {
                if (!isOpened) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#16a34a';
              }}
            >
              {isOpened ? (
                <>
                  <CheckCircle size={20} />
                  Caja Abierta para el Día Siguiente
                </>
              ) : (
                <>
                  <DollarSign size={20} />
                  Confirmar Apertura
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: HISTORY */}
      {currentStep === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#37352f', margin: 0 }}>
            Historial de cierres de caja
          </h2>

          {closureHistory.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e5e5',
              borderRadius: '0.25rem',
              color: '#9ca3af',
            }}>
              <AlertCircle size={32} style={{ marginBottom: '1rem', display: 'block' }} />
              No hay cierres registrados aún
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {closureHistory.map((record, index) => (
                <div 
                  key={record.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.25rem',
                    borderLeft: record.discrepancy !== 0 ? '4px solid #f59e0b' : '4px solid #10b981',
                    position: 'relative',
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '24px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: record.discrepancy !== 0 ? '#f59e0b' : '#10b981',
                    border: '3px solid #ffffff',
                    borderRadius: '50%',
                  }} />

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#37352f' }}>
                        Cierre #{closureHistory.length - index}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                        {record.date}
                      </div>
                    </div>
                    {record.discrepancy !== 0 && (
                      <div style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#fef3c7',
                        border: '1px solid #fcd34d',
                        borderRadius: '0.25rem',
                        color: '#92400e',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                      }}>
                        ⚠ Discrepancia: ${record.discrepancy > 0 ? '+' : ''}{record.discrepancy.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Content Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}>
                    {/* Sales Summary */}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Ventas
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#37352f' }}>
                        ${record.totalBruto.toLocaleString()}
                      </div>
                    </div>

                    {/* Cash */}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Efectivo esperado
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#37352f' }}>
                        ${record.cash.toLocaleString()}
                      </div>
                    </div>

                    {/* Counted Cash */}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Efectivo contado
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: record.discrepancy !== 0 ? '#f59e0b' : '#37352f' }}>
                        ${record.countedCash.toLocaleString()}
                      </div>
                    </div>

                    {/* Card */}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Tarjeta
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#37352f' }}>
                        ${record.card.toLocaleString()}
                      </div>
                    </div>

                    {/* Transfer */}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Transferencia
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#37352f' }}>
                        ${record.transfer.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Discrepancy Note */}
                  {record.discrepancyNote && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.25rem',
                      color: '#92400e',
                      fontSize: '0.875rem',
                      marginTop: '1rem',
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Nota de discrepancia:</div>
                      {record.discrepancyNote}
                    </div>
                  )}

                  {/* Withdrawals */}
                  {record.withdrawals && record.withdrawals.length > 0 && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#37352f', marginBottom: '0.5rem' }}>
                        Retiros:
                      </div>
                      {record.withdrawals.map((withdrawal, wIdx) => (
                        <div key={wIdx} style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                          • {withdrawal.date}: ${withdrawal.amount.toLocaleString()} - {withdrawal.reason}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          * {
            box-shadow: none !important;
          }
          button, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
