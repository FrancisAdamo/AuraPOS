import { Search, Command } from 'lucide-react';
import { useState, useMemo } from 'react';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: string;
}

interface CommandPaletteProps {
  onClose: () => void;
  onSelect: (id: string) => void;
}

export default function CommandPalette({ onClose, onSelect }: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  const commands: CommandItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Ver resumen de alertas y actividad',
      category: 'Navegación',
    },
    {
      id: 'pos',
      label: 'Módulo de ventas (POS)',
      description: 'Gestionar transacciones y carrito',
      category: 'Navegación',
    },
    {
      id: 'inventory',
      label: 'Control de Inventario',
      description: 'Gestionar productos y proveedores',
      category: 'Navegación',
    },
    {
      id: 'closing',
      label: 'Cierre de Caja',
      description: 'Realizar cierre diario de ventas',
      category: 'Navegación',
    },
    {
      id: 'help',
      label: 'Centro de Ayuda',
      description: 'Manual de usuario y documentación',
      category: 'Navegación',
    },
  ];

  const filtered = useMemo(() => {
    if (!search) return commands;
    
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, commands]);

  const handleSelect = (id: string) => {
    onSelect(id);
  };

  const groupedCommands = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onClick={onClose}>
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl border-notion-border" onClick={e => e.stopPropagation()}>
        
        {/* Search Input */}
        <div className="px-4 py-3 border-b border-notion-border">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-notion-secondary" />
            <input
              type="text"
              placeholder="Escribe un comando o presiona ESC para cerrar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
              }}
              className="w-full pl-10 pr-4 py-2 focus:outline-none text-notion-text"
            />
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-notion-secondary bg-gray-50 sticky top-0">
                {category}
              </div>
              
              {items.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.id)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-notion-border last:border-0 flex items-start justify-between group"
                >
                  <div>
                    <p className="font-medium text-notion-text">{cmd.label}</p>
                    <p className="text-xs text-notion-secondary mt-1">{cmd.description}</p>
                  </div>
                  <Command size={16} className="text-gray-300 group-hover:text-blue-400 mt-1" />
                </button>
              ))}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-notion-secondary">No se encontraron comandos</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-notion-border bg-gray-50 text-xs text-notion-secondary flex items-center justify-between">
          <span>Selecciona un comando con Enter</span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white border border-notion-border rounded text-xs">ESC</kbd>
            para cerrar
          </span>
        </div>
      </div>
    </div>
  );
}
