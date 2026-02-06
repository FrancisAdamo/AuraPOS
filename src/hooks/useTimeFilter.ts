import { useState, useMemo } from 'react';

export type TimePeriod = 'day' | 'week' | 'month' | 'year';

interface TimeFilterHook {
  period: TimePeriod;
  setPeriod: (period: TimePeriod) => void;
  formatDateRange: string;
  getFilteredData: <T>(data: T[], dateField: keyof T) => T[];
}

export function useTimeFilter(): TimeFilterHook {
  const [period, setPeriod] = useState<TimePeriod>('week');

  const formatDateRange = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    }

    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };

    if (period === 'day') {
      return startDate.toLocaleDateString('es-ES', options);
    }

    return `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`;
  }, [period]);

  const getFilteredData = <T,>(data: T[], dateField: keyof T): T[] => {
    if (!data.length) return [];

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    }

    return data.filter(item => {
      const itemDate = new Date(item[dateField] as string);
      return itemDate >= startDate && itemDate <= now;
    });
  };

  return {
    period,
    setPeriod,
    formatDateRange,
    getFilteredData
  };
}
