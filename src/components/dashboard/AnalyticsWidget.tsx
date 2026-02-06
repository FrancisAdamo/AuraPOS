import { type ReactNode } from 'react';
import { Card } from '../ui';
import { ExportButtons } from './ExportButtons';
import type { ExportData } from '../../hooks/useReportExport';

interface AnalyticsWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  exportData?: ExportData;
}

export function AnalyticsWidget({ 
  title, 
  children, 
  className = '',
  isCollapsible = false,
  isCollapsed = false,
  onToggleCollapse,
  exportData
}: AnalyticsWidgetProps) {
  return (
    <Card className={`analytics-widget ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-notion-primary m-0">
            {title}
          </h3>
          
          <div className="flex items-center gap-2">
            {exportData && (
              <ExportButtons 
                exportData={exportData} 
                className="flex items-center gap-1"
              />
            )}
            
            {isCollapsible && (
              <button
                onClick={onToggleCollapse}
                className="text-notion-secondary hover:text-notion-primary transition-colors p-1 rounded hover:bg-notion-hover"
                aria-label={isCollapsed ? 'Expandir widget' : 'Colapsar widget'}
              >
                {isCollapsed ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="widget-content">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
