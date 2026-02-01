# AuraPOS - Configuración y Variables de Entorno

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto si necesitas variables de entorno personalizadas.

```env
# .env (ejemplo)
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=AuraPOS
VITE_APP_VERSION=1.0.0
```

## Configuración de Tailwind

El archivo `tailwind.config.js` incluye:

### Colores Personalizados (Notion-Style)

```javascript
colors: {
  notion: {
    bg: '#ffffff',           // Fondo blanco puro
    text: '#37352f',         // Texto gris oscuro
    border: '#e5e5e5',       // Bordes gris claro
    hover: '#f5f5f5',        // Hover gris más claro
    secondary: '#9ca3af',    // Texto secundario
  },
}
```

### Fuente Inter

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

### Bordes Suaves

```javascript
borderRadius: {
  sm: '4px',  // Bordes sutiles de 4px
}
```

### Sombras Notion

```javascript
boxShadow: {
  'notion': '0 1px 2px rgba(0, 0, 0, 0.05)',  // Sombra muy sutil
}
```

## Estructura de Componentes

### App.tsx (Principal)
```typescript
- Estado: activeView, showCommand, showAuraBrain
- Listeners: Cmd+K para command palette
- Renders: Sidebar + Main content + Modals
```

### Componentes por Módulo

#### Sidebar.tsx
```typescript
Props:
  - activeView: string
  - onViewChange: (view: string) => void

Estado: Menu items (4 módulos)
```

#### AlertDashboard.tsx
```typescript
Widgets:
  1. Productos Más Vendidos (Mock data)
  2. Alerta de Stock (Mock data)
  3. Resumen de Caja (Mock data)

Sin props - Datos simulados en el componente
```

#### POSModule.tsx
```typescript
Props: None

Estado:
  - searchTerm: string (búsqueda)
  - cart: CartItem[] (carrito)
  - showSuccess: boolean (mensaje de éxito)

Funciones:
  - addToCart(product)
  - removeFromCart(id)
  - updateQuantity(id, quantity)
  - handleFinalizeSale()
```

#### InventoryModule.tsx
```typescript
Props: None

Estado:
  - selectedProvider: string | null
  - expandedGroups: Record<string, boolean>

Funciones:
  - toggleGroup(provider)
  - Filtrado automático por proveedor
  - Agrupación por proveedor
```

#### CashClosing.tsx
```typescript
Props: None

Estado:
  - isExpanded: boolean
  - isClosed: boolean

Funciones:
  - handleClosure() (requiere confirmación)

Mock data:
  - salesData: desglose de ventas
```

#### CommandPalette.tsx
```typescript
Props:
  - onClose: () => void
  - onSelect: (id: string) => void

Estado:
  - search: string

Funcionalidad:
  - Búsqueda en tiempo real
  - Navegación entre módulos
  - ESC para cerrar
```

#### AuraBrain.tsx
```typescript
Props:
  - onClose: () => void

Estado:
  - messages: Array<{role, content}>
  - input: string

Funciones:
  - handleSend() (simula respuestas IA)
  - Respuestas basadas en palabras clave
```

## Datos Simulados

### Productos (POSModule)
```javascript
[
  { id: 1, name: 'iPhone 15 Pro', price: 1500, category: 'Smartphones' },
  { id: 2, name: 'Samsung S24', price: 1400, category: 'Smartphones' },
  // ... más productos
]
```

### Inventario (InventoryModule)
```javascript
[
  { id: 1, sku: 'SKU001', name: 'iPhone 15 Pro', provider: 'Apple', stock: 45, status: 'green' },
  // ... más items
]
```

### Dashboard (AlertDashboard)
```javascript
topProducts: [
  { id: 1, name: 'iPhone 15 Pro', sales: 156, revenue: 234000 },
  // ... más
]

lowStockItems: [
  { id: 1, name: 'Cargador USB-C', sku: 'CHARGE001', stock: 3 },
  // ... más
]

cashSummary: {
  cash: 12500,
  card: 18750,
  transfer: 5200,
  total: 36450,
}
```

## Scripts NPM

```json
{
  "dev": "vite",                    // Inicia servidor de desarrollo
  "build": "tsc && vite build",     // Build para producción
  "preview": "vite preview",         // Preview del build
  "lint": "eslint . --ext .ts,.tsx"  // Lint de código
}
```

## Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "lucide-react": "^latest",
  "react-hook-form": "^7.x",
  "zustand": "^4.x"
}
```

### DevDependencies

```json
{
  "typescript": "^5.2.2",
  "tailwindcss": "^4.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "@vitejs/plugin-react": "^4.x",
  "vite": "^7.3.1"
}
```

## Clases CSS Personalizadas (Tailwind)

```css
.notion-border     /* border border-notion-border */
.notion-card       /* bg-white notion-border rounded-sm shadow-notion */
.notion-hover      /* hover:bg-notion-hover transition-colors */
.notion-input      /* w-full px-3 py-2 notion-border rounded-sm focus:ring-2 */
.btn-primary       /* px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 */
.btn-secondary     /* px-4 py-2 bg-gray-100 text-notion-text rounded-sm hover:bg-gray-200 */
```

## Breakpoints Tailwind (Responsive)

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Optimizaciones Realizadas

1. ✅ Tipografía Inter cargada desde Google Fonts
2. ✅ Colores Notion-style configurados en Tailwind
3. ✅ Bordes suaves de 1px
4. ✅ Componentes modulares y reutilizables
5. ✅ Estados visuales claros
6. ✅ Transiciones suaves
7. ✅ Responsive design
8. ✅ Accesibilidad básica

## Deploy a Producción

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Configura tu repo para deploy desde carpeta 'dist'
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Notas de Mantenimiento

1. **Datos Simulados**: Reemplaza con llamadas a API cuando sea posible
2. **Validación**: Implementa validación en servidor, no solo en cliente
3. **Seguridad**: Usa HTTPS, valida tokens, implementa CORS
4. **Performance**: Considera lazy loading de componentes grandes
5. **Testing**: Agrega tests unitarios con Vitest o Jest

---

**Última actualización**: 10 de Enero de 2026
