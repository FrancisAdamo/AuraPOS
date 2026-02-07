import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Search, Book, Keyboard, HelpCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface HelpSection {
  id: string;
  title: string;
  icon: LucideIcon;
  level: number;
}

export default function HelpPage() {
  const navigate = useNavigate();
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
    <div className="flex h-screen bg-notion-background">
      {/* Sidebar de navegación tipo Google Docs */}
      <div className="w-80 bg-white border-r border-notion-border shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-notion-primary mb-6 flex items-center gap-2">
            <Book className="w-6 h-6 text-blue-600" />
            Manual de Ayuda
          </h2>
          
          {/* Navegación por secciones */}
          <nav className="space-y-2">
            {helpSections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-notion-primary text-white shadow-md'
                    : 'hover:bg-notion-hover text-notion-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-notion-secondary" />
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-sm text-notion-secondary">Nivel {section.level}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-notion-secondary">Cargando contenido...</div>
          </div>
        ) : (
          <div className="prose prose-notion max-w-none">
            <ReactMarkdown>{manualContent}</ReactMarkdown>
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
