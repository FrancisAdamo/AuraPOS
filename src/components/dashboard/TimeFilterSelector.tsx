import { Calendar, Clock, CalendarDays, TrendingUp } from 'lucide-react';
import { useTimeFilter, type TimePeriod } from '../../hooks/useTimeFilter';

const PERIOD_OPTIONS = [
  { value: 'day' as TimePeriod, label: 'Hoy', icon: Calendar },
  { value: 'week' as TimePeriod, label: 'Semana', icon: CalendarDays },
  { value: 'month' as TimePeriod, label: 'Mes', icon: Clock },
  { value: 'year' as TimePeriod, label: 'Año', icon: TrendingUp },
];

interface TimeFilterSelectorProps {
  onPeriodChange?: (period: TimePeriod) => void;
}

export function TimeFilterSelector({ onPeriodChange }: TimeFilterSelectorProps) {
  const { period, setPeriod, formatDateRange } = useTimeFilter();

  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-notion-border">
      <div className="flex items-center gap-2">
        <Calendar size={20} className="text-notion-secondary" />
        <span className="text-sm font-medium text-notion-primary">
          Período:
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {PERIOD_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = period === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => handlePeriodChange(option.value)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-notion-secondary hover:text-notion-primary hover:bg-notion-hover border border-transparent'
                }
              `}
            >
              <Icon size={16} />
              {option.label}
            </button>
          );
        })}
      </div>
      
      <div className="ml-auto text-sm text-notion-secondary">
        {formatDateRange}
      </div>
    </div>
  );
}
