# Guía de Uso - AuraPOS

Una guía completa para navegar y utilizar todas las funcionalidades de AuraPOS.

## 🏠 Página de Inicio - Dashboard

El Dashboard es tu punto de control central con información en tiempo real.

### Widgets Principales

#### 1️⃣ Productos Más Vendidos
- **Ubicación**: Arriba a la izquierda
- **Información mostrada**:
  - Ranking (1, 2, 3)
  - Nombre del producto
  - Cantidad de unidades vendidas
  - Ingresos generados
- **Uso**: Identifica rápidamente los productos estrella del día

#### 2️⃣ Alerta de Stock
- **Ubicación**: Arriba en el centro
- **Productos mostrados**: Artículos con stock bajo o crítico
- **Badges**:
  - 🔴 Rojo: Stock crítico (menos de 5 unidades)
  - 🟡 Amarillo: Stock bajo (5-10 unidades)
- **Uso**: Recibe alertas visuales para reordenar rápidamente

#### 3️⃣ Resumen de Caja
- **Ubicación**: Arriba a la derecha
- **Información**:
  - Total en efectivo
  - Total en tarjeta
  - Total en transferencias
  - **Total general del día**
- **Uso**: Monitorea los ingresos del día en tiempo real

---

## 💳 Módulo de Ventas (POS)

El módulo POS es tu herramienta principal para procesar transacciones.

### Búsqueda de Productos

```
┌─ BÚSQUEDA AVANZADA ─────────────────┐
│ 🔍 Buscar productos o presiona '/'  │
└─────────────────────────────────────┘
```

**Cómo usar:**
1. Haz clic en la barra de búsqueda
2. Escribe el nombre del producto
3. Los resultados se actualizan en tiempo real
4. Haz clic en "Agregar" para añadir al carrito

**Atajos:**
- Presiona `/` para activar búsqueda rápida
- `Enter` para seleccionar el primer resultado

### Carrito Lateral

**Características:**
- Visualización clara de productos agregados
- Control de cantidad (+ / -)
- Precio total por producto
- Botón para eliminar items
- **Resumen de totales**

**Proceso de Venta:**

```
1. Busca y agrega productos
   ↓
2. Ajusta cantidades si es necesario
   ↓
3. Revisa el total en el carrito
   ↓
4. Haz clic en "Finalizar Venta"
   ↓
5. Recibirás confirmación: "Stock actualizado correctamente"
   ↓
6. El carrito se limpiará automáticamente
```

**Ejemplo de Transacción:**
- iPhone 15 Pro x1 = $1,500
- AirPods Pro x2 = $560
- **Total: $2,060**

---

## 📦 Control de Inventario

Gestiona tu stock de forma inteligente con vista por proveedor.

### Estructura de la Tabla

```
┌─ APPLE ─────────────── (8 productos, Stock total: 85) ─┐
│ ▼ SKU  │ Producto      │ Stock │ Estado               │
│   001  │ iPhone 15 Pro │  45   │ ✅ En Stock          │
│   003  │ USB-C Cable   │   8   │ ⚠️ Stock Bajo       │
│   006  │ MacBook Pro   │  12   │ ✅ En Stock          │
│   008  │ AirPods Pro   │  28   │ ✅ En Stock          │
└─────────────────────────────────────────────────────────┘
```

### Funcionalidades

#### Agrupación por Proveedor
- Los productos se agrupan automáticamente
- Haz clic en el encabezado del proveedor para expandir/contraer
- Número total de productos y stock mostrado

#### Filtrado Rápido
```
┌─ FILTRO ────────────────────────────────┐
│ [Ver todos] [Apple] [Samsung] [Generic] │
└─────────────────────────────────────────┘
```

**Cómo filtrar:**
1. Haz clic en el botón del proveedor
2. La vista se actualiza instantáneamente
3. Haz clic en "Ver todos" para resetear

#### Estados de Stock

| Color | Estado | Acción Recomendada |
|-------|--------|-------------------|
| 🟢 Verde | En Stock | Mantener actual |
| 🟡 Amarillo | Stock Bajo | Considerar reorden |
| 🔴 Rojo | Crítico | Reordenar urgente |

---

## 💰 Cierre de Caja

Realiza el cierre diario de ventas de forma segura.

### Estructura del Cierre

#### 1. Resumen General
```
┌─ RESUMEN DEL DÍA ─────────────────────┐
│ Viernes, 10 de Enero de 2026           │
│                                         │
│ Total de Ventas Brutas: $36,450        │
└─────────────────────────────────────────┘
```

#### 2. Desglose por Método de Pago

**Efectivo**
- Cantidad: $12,500
- Porcentaje: 34.3%
- Barra de progreso visual

**Tarjeta**
- Cantidad: $18,750
- Porcentaje: 51.5%
- Barra de progreso visual

**Transferencia**
- Cantidad: $5,200
- Porcentaje: 14.2%
- Barra de progreso visual

#### 3. Proceso de Cierre

```
1. Revisa todos los detalles
   ↓
2. Haz clic en "Realizar Cierre de Caja"
   ↓
3. Confirma en el diálogo de confirmación
   ↓
4. Sistema bloquea todas las transacciones del día
   ↓
5. Verás el estado: "✓ Cierre Completado"
```

**⚠️ Importante**: Una vez realizado el cierre, no se pueden editar las transacciones del día.

---

## ⌨️ Barra de Comandos (Cmd + K)

Tu atajo para navegar rápidamente entre módulos.

### Cómo Activar

- **Mac**: Presiona `Cmd + K`
- **Windows/Linux**: Presiona `Ctrl + K`

### Interfaz

```
┌─ BUSCADOR DE COMANDOS ──────────────┐
│ 🔍 Escribe un comando...            │
│                                      │
│ 📌 NAVEGACIÓN                       │
│ ┌─ Dashboard                        │
│ │  Ver resumen de alertas...        │
│ ├─ Módulo de Ventas (POS)           │
│ │  Gestionar transacciones...       │
│ ├─ Control de Inventario            │
│ │  Gestionar productos...           │
│ └─ Cierre de Caja                   │
│    Realizar cierre diario...        │
│                                      │
│ [Presiona ESC para cerrar]           │
└─────────────────────────────────────┘
```

### Ejemplos de Uso

1. **Navegar a Ventas**
   - Presiona `Cmd + K`
   - Escribe "POS" o "Ventas"
   - Presiona `Enter`

2. **Ir a Inventario**
   - Presiona `Cmd + K`
   - Escribe "Inventario"
   - Presiona `Enter`

3. **Realizar Cierre**
   - Presiona `Cmd + K`
   - Escribe "Cierre"
   - Presiona `Enter`

---

## 🧠 Aura Brain - Asistente IA

Tu asistente inteligente para análisis y recomendaciones.

### Cómo Acceder

1. Busca el botón flotante **"✨ Activar Aura Brain"** en la esquina inferior derecha
2. Haz clic para abrir el chat

### Funcionalidades

#### Análisis de Ventas
```
👤 Usuario: "¿Cómo están las ventas hoy?"

🤖 Aura Brain: "Basándome en los datos de hoy, 
tus ventas están un 15% por encima del promedio. 
Los iPhone 15 Pro lideran las ventas con 156 unidades..."
```

#### Recomendaciones de Inventario
```
👤 Usuario: "¿Qué productos debo reordenar?"

🤖 Aura Brain: "Detecté que el inventario de 
'iPhone Case' está crítico (2 unidades). 
También recomiendo reordenar USB-C cables..."
```

#### Análisis de Caja
```
👤 Usuario: "¿Qué métodos de pago usaron más?"

🤖 Aura Brain: "El 51.5% proviene de tarjeta 
de crédito, 34.3% de efectivo y 14.2% de 
transferencias..."
```

#### Optimizaciones
```
👤 Usuario: "¿Cómo puedo mejorar?"

🤖 Aura Brain: "Aquí están mis recomendaciones:
1. Aumentar stock de bestsellers
2. Reordenar productos críticos urgentemente
3. Promocionar categorías con baja rotación..."
```

### Tips para Mejores Respuestas

- Sé específico: "¿Cuántas unidades vendí de iPhone?"
- Pregunta sobre tendencias: "¿Cuál es el producto con menor rotación?"
- Solicita recomendaciones: "¿Qué cambios me ayudarían a vender más?"
- Analiza métodos de pago: "¿Cuál es el método de pago más seguro?"

---

## 🎮 Navegación Lateral (Sidebar)

El sidebar es tu navegación principal.

### Botones Principales

```
┌─ AURAPOS ────────────────────┐
│ ERP de próxima generación    │
├──────────────────────────────┤
│ 📊 Dashboard                 │
│ ⚡ Ventas (POS)             │
│ 📦 Inventario               │
│ 🚪 Cierre de Caja           │
├──────────────────────────────┤
│ Versión 1.0.0                │
│ © 2026 AuraPOS               │
└──────────────────────────────┘
```

### Estados Visuales

- **Activo**: Fondo azul, indicador izquierdo
- **Inactivo**: Fondo blanco, se ilumina al pasar mouse
- **Hover**: Fondo gris claro

---

## 📊 Ejemplo de Flujo de Trabajo Completo

### Escenario: Cierre de Día Típico

```
08:00 - INICIO DE TURNO
  ↓
  [Revisa Dashboard]
  - Verifica alertas de stock
  - Nota: Stock bajo de USB-C cables
  
15:00 - TRABAJO DEL DÍA
  ↓
  [Usa POS Module]
  - Realiza 45 transacciones
  - Busca productos rápidamente
  - Gestiona carrito
  
18:00 - FIN DE TURNO
  ↓
  [Consulta Aura Brain]
  - "¿Cómo fue el día?"
  - Obtiene análisis automático
  
18:30 - CIERRE DE CAJA
  ↓
  [Entra a Cierre de Caja]
  - Revisa resumen
  - Desglose por método pago
  - Haz clic "Realizar Cierre"
  
18:35 - CIERRE COMPLETADO ✓
  ↓
  Sistema bloqueado, listos para el próximo día
```

---

## 🆘 Solución de Problemas

### El carrito no se actualiza
- Intenta refrescar la página (`F5`)
- Cierra y reabre el navegador

### Los comandos no funcionan
- Asegúrate de usar `Cmd + K` (Mac) o `Ctrl + K` (Windows)
- Presiona `ESC` para cerrar y vuelve a intentar

### Aura Brain no responde
- Espera 2-3 segundos por la respuesta simulada
- Intenta una pregunta más específica

### Stock no se actualiza
- Los datos en la demostración se simulan
- En producción, se sincronizarían con tu base de datos

---

## 🎯 Consejos y Trucos

1. **Búsqueda Rápida**: Presiona `/` directamente en POS para buscar sin hacer clic
2. **Navegación**: Usa `Cmd + K` para cambiar entre módulos más rápido que clicear
3. **Cierre**: Realiza el cierre al final del turno, antes de cerrar la aplicación
4. **Aura Brain**: Consulta después de cada cierre para obtener insights del día
5. **Inventario**: Revisa regularmente el control de inventario para evitar stock crítico

---

**¡Feliz venta!** 🎉

Para más información o soporte, contacta al equipo de desarrollo.
