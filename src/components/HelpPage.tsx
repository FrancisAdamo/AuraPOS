import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Book, Keyboard, HelpCircle, FileText } from 'lucide-react';

interface HelpSection {
  id: string;
  title: string;
  icon: React.ElementType;
  level: number;
}

export default function HelpPage() {
  const [manualContent, setManualContent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Secciones principales del manual
  const helpSections: HelpSection[] = [
    { id: 'introduccion', title: 'Introducción', icon: Book, level: 1 },
    { id: 'modulos-segun-rol', title: 'Módulos por Rol', icon: HelpCircle, level: 1 },
    { id: 'guias-paso-a-paso', title: 'Guías Paso a Paso', icon: FileText, level: 1 },
    { id: 'dashboard-y-graficos', title: 'Dashboard y Gráficos', icon: Book, level: 1 },
    { id: 'atajos-de-teclado', title: 'Atajos de Teclado', icon: Keyboard, level: 1 },
    { id: 'preguntas-frecuentes', title: 'Preguntas Frecuentes', icon: HelpCircle, level: 1 },
  ];

  useEffect(() => {
    loadManualContent();
  }, []);

  const loadManualContent = async () => {
    try {
      // En producción, esto podría venir de una API o import estático
      const response = await fetch('/MANUAL_USUARIO.md');
      const content = await response.text();
      setManualContent(content);
    } catch (error) {
      // Fallback: contenido de muestra
      setManualContent(getFallbackContent());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackContent = () => {
    return `# Manual de Usuario - AuraPOS

## 📖 Introducción

Bienvenido a **AuraPOS**, tu sistema de gestión de ventas e inventario...

## 🛍️ Módulos según Rol

### 📋 Guía para el Vendedor

#### 💰 Módulo de Ventas (POS)

El punto de venta es tu herramienta principal para registrar transacciones...

## 🎯 Guías Paso a Paso

### 💳 Cómo Realizar una Venta

#### Paso 1: Buscar Productos

## 📊 Dashboard y Gráficos

## ⌨️ Atajos de Teclado

### 🚀 Comando Rápido (Ctrl+K)

## ❓ Preguntas Frecuentes`;
  };

  const parseMarkdown = (content: string) => {
    // Simple markdown parser para renderizado básico
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
          const title = line.replace('## ', '');
          const sectionId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
          return (
            <h2 key={index} id={sectionId} className="text-2xl font-bold text-notion-primary mt-8 mb-4">
              {title}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          const title = line.replace('### ', '');
          return (
            <h3 key={index} className="text-xl font-semibold text-notion-primary mt-6 mb-3">
              {title}
            </h3>
          );
        }
        if (line.startsWith('#### ')) {
          const title = line.replace('#### ', '');
          return (
            <h4 key={index} className="text-lg font-medium text-notion-primary mt-4 mb-2">
              {title}
            </h4>
          );
        }

        // Lists
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="ml-6 text-notion-secondary mb-1">
              {line.replace('- ', '')}
            </li>
          );
        }

        // Code blocks
        if (line.startsWith('```')) {
          return (
            <pre key={index} className="bg-notion-hover p-4 rounded-lg mb-4 text-sm font-mono">
              {line.replace('```', '')}
            </pre>
          );
        }

        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }

        // Regular text
        return (
          <p key={index} className="text-notion-secondary mb-4 leading-relaxed">
            {processInlineMarkdown(line)}
          </p>
        );
      });
  };

  const processInlineMarkdown = (text: string) => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-notion-hover px-2 py-1 rounded text-sm">$1</code>')
      // Emojis (keep as is)
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, (match) => match);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-notion-secondary">Cargando manual de usuario...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-notion-secondary hover:text-notion-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
        </div>
        
        <h1 className="text-4xl font-bold text-notion-primary mb-2">
          Centro de Ayuda
        </h1>
        <p className="text-notion-secondary text-lg">
          Manual completo de usuario para AuraPOS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-3 top-3 text-notion-secondary" />
              <input
                type="text"
                placeholder="Buscar en la ayuda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-notion-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Navigation Sections */}
            <nav className="space-y-2">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 border-l-2 border-l-blue-600'
                        : 'hover:bg-notion-hover text-notion-primary'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 p-4 bg-notion-hover rounded-lg">
              <h3 className="font-semibold text-notion-primary mb-3">Acciones Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-notion-secondary hover:text-notion-primary">
                  Descargar PDF
                </button>
                <button className="w-full text-left text-sm text-notion-secondary hover:text-notion-primary">
                  Imprimir manual
                </button>
                <button className="w-full text-left text-sm text-notion-secondary hover:text-notion-primary">
                  Contactar soporte
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-notion-border p-8">
            <div className="prose prose-notion max-w-none">
              {parseMarkdown(manualContent)}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-notion-border">
              <div className="flex items-center justify-between text-sm text-notion-secondary">
                <div>
                  <p>Manual de Usuario AuraPOS v1.0.0</p>
                  <p>Última actualización: Enero 2026</p>
                </div>
                <div className="flex gap-4">
                  <button className="hover:text-notion-primary">
                    Descargar PDF
                  </button>
                  <button className="hover:text-notion-primary">
                    Imprimir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
