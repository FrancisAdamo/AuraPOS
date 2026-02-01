# AuraPOS - ERP de Próxima Generación

Una interfaz de punto de venta (POS) y ERP moderna con estética Notion-Style, construida con React, TypeScript y Tailwind CSS.

## ✨ Características Principales

### 1. **Dashboard de Alertas**
- **Productos Más Vendidos**: Top 3 con estadísticas de ventas
- **Alerta de Stock**: Badge rojo para productos críticos
- **Resumen de Caja**: Desglose de efectivo, tarjeta y transferencias

### 2. **Módulo de Ventas (POS)**
- Búsqueda rápida de productos con `/`
- Carrito lateral intuitivo
- Actualización de cantidad en tiempo real
- Mensaje de confirmación "Stock actualizado correctamente"
- Historial de transacciones

### 3. **Control de Inventario Avanzado**
- Tabla tipo Notion con agrupación por proveedor
- Columnas: SKU, Producto, Proveedor, Stock Actual, Estado
- Badges de estado: Verde (En Stock), Amarillo (Stock Bajo), Rojo (Crítico)
- Filtro rápido por proveedor
- Expandir/Contraer grupos de proveedores

### 4. **Cierre de Caja**
- Sección colapsable con desglose detallado
- Total de Ventas Brutas
- Desglose por Método de Pago (Efectivo, Tarjeta, Transferencia)
- Gráficos de distribución de pagos
- Botón "Realizar Cierre" que bloquea ediciones
- Indicador visual de cierre realizado

### 5. **Barra de Comandos (Cmd + K)**
- Navegación rápida entre módulos
- Búsqueda de comandos
- Interfaz elegante y minimalista
- Atajos de teclado

### 6. **Aura Brain - Asistente IA** ✨
- Análisis inteligente de datos
- Recomendaciones de inventario
- Predicciones de tendencias
- Chat interactivo en tiempo real
- Botón flotante para activación

## 🎨 Estética y Diseño

- **Tipografía**: Inter (Google Fonts)
- **Colores**: Blancos limpios, bordes suaves de 1px
- **Iconos**: Lucide React
- **Framework CSS**: Tailwind CSS
- **Inspiración**: Notion-Style
- **Paleta de Colores**:
  - Fondo: `#ffffff` (Blanco puro)
  - Texto principal: `#37352f` (Gris oscuro)
  - Bordes: `#e5e5e5` (Gris claro)
  - Acentos: Azul, Verde, Rojo para estados

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar o descargar el proyecto
cd /home/fra/Github/AuraPOS

# 2. Instalar dependencias (ya realizado)
npm install

# 3. Instalar Tailwind CSS (ya configurado)
# Las configuraciones necesarias ya están en tailwind.config.js y postcss.config.js

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# Local: http://localhost:5173/
```

### Build para Producción
```bash
npm run build
npm run preview
```

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── Sidebar.tsx              # Navegación lateral minimalista
│   ├── AlertDashboard.tsx       # Dashboard con 3 widgets
│   ├── POSModule.tsx            # Sistema de punto de venta
│   ├── InventoryModule.tsx      # Control de inventario
│   ├── CashClosing.tsx          # Cierre de caja colapsable
│   ├── CommandPalette.tsx       # Barra de comandos (Cmd + K)
│   └── AuraBrain.tsx            # Asistente IA
├── App.tsx                      # Componente principal
├── main.tsx                     # Punto de entrada
├── index.css                    # Estilos Tailwind
└── App.css                      # Estilos adicionales (minimalista)

tailwind.config.js              # Configuración Tailwind
postcss.config.js               # Configuración PostCSS
```

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Cmd + K` o `Ctrl + K` | Abrir barra de comandos |
| `ESC` | Cerrar barra de comandos o modales |
| `/` | Activar búsqueda de productos (en POS) |
| `Enter` | Confirmar selección en comandos |

## 🎯 Casos de Uso

### Para Gerentes de Tienda
- Monitoreo rápido de alertas y ventas del día
- Cierre de caja diario con validación

### Para Vendedores
- Búsqueda y venta rápida de productos
- Gestión de carrito intuitiva
- Confirmación inmediata de transacciones

### Para Encargados de Inventario
- Visualización completa de stock por proveedor
- Identificación rápida de productos críticos
- Filtros y búsqueda avanzada

### Para Gerencia General
- Análisis de tendencias con Aura Brain
- Recomendaciones de optimización
- Desglose detallado de métodos de pago

## 🔧 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "lucide-react": "^0.x.x",
  "tailwindcss": "^4.x.x",
  "postcss": "^8.x.x",
  "autoprefixer": "^10.x.x"
}
```

## 🌟 Próximas Mejoras (Roadmap)

- [ ] Integración con API backend
- [ ] Base de datos en tiempo real (Firebase/Supabase)
- [ ] Gráficos más avanzados (Chart.js, Recharts)
- [ ] Autenticación y roles de usuario
- [ ] Reportes PDF descargables
- [ ] Sincronización multi-tienda
- [ ] Integración de pagos (Stripe, PayPal)
- [ ] Análisis IA más avanzado con ML.js
- [ ] Aplicación móvil (React Native)
- [ ] Modo oscuro (Dark Mode)

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos**: Desktop, Tablet (responsive)
- **Resoluciones**: 1024px en adelante (optimizado para desktop)

## 🎓 Aprender Más

### Documentación Externa
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Vite](https://vitejs.dev)

## 📞 Soporte y Contribuciones

Para reportar bugs o sugerir mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

© 2026 AuraPOS - Todos los derechos reservados.

---

**Versión**: 1.0.0  
**Última actualización**: 10 de Enero de 2026  
**Estado**: Production Ready ✨

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
