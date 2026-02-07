# 🚀 POS System Evolution Track

## 🛠 Fase 1: Auth, Roles e Internacionalización (Cimientos)
- [x] **Punto 1 (Auth):** Implementar funcionalidad de 'Logout'. Asegurar que limpie el estado global y redirija a /login.
- [x] **Punto 2 (RBAC):** Restringir accesos por rol. 
    - Vendedor: Solo Ventas (POS), Inventario y Cierre de Caja.
    - Dueño: Acceso total (incluyendo Dashboard y Reportes).
- [x] **Punto 3 (I18n):** Traducción global de términos. Cambiar "Owner" por "Dueño" y "Vendor" por "Vendedor" en toda la interfaz.

## 📦 Fase 2: Lógica de Negocio y Data (Core)
- [x] **Punto 4 (Ventas):** Reparar acción del botón "Cobrar". Debe procesar la venta, vaciar el carrito y emitir confirmación.
- [x] **Punto 5 (Inventario):** Corregir filtro de Sucursales. Asegurar que el cambio entre 'Central' y 'Norte' actualice los datos del catálogo.
- [x] **Punto 6 (Data Schema):** Añadir campo `barcode` (numérico) a los productos. Integrar visualización de código de barras en módulos de Venta e Inventario.

## 🎨 Fase 3: UI y Estética Global (Branding)
- [x] **Punto 7 (Diseño):** Aplicación total del tema 'Beige'. Revisar componentes que aún no siguen la paleta de colores acordada.
- [x] **Punto 8 (Inventario UI):** Refactor de tarjetas de productos. 
    - Eliminar etiquetas duplicadas.
    - Ubicar el estado de stock junto al texto principal.
    - Aumentar densidad (más tarjetas por fila/grid).
- [x] **Punto 9 (Inventario Search):** Rediseñar input de búsqueda. Aumentar ancho para que el placeholder "Buscar por nombre..." sea legible.
- [x] **Punto 10 (Limpieza UX):** Corregir overlay de 'Windows + K'. Evitar que la leyenda de comandos ensucie la vista principal (ajustar z-index o posición).

## 📊 Fase 4: Reportes y UX Avanzada (Finalización)
- [x] **Punto 11 (Dashboard PDF):** Corregir exportación a PDF. Reparar el renderizado de fuentes/texto para que sea legible.
- [x] **Punto 12 (Dashboard UX):** Mejorar indicadores de 'Drag & Drop'. Cambiar iconos de flechas por 'grab handles' (puntos) más intuitivos.
- [x] **Punto 13 (Dashboard Data):** Desacoplar Histogramas. Separar visualmente el 'Análisis de Ventas' de los 'Picos de Venta'.
- [x] **Punto 14 (Ayuda Pro):** Refactor de sección Ayuda. 
    - Aplicar estilos de tipografía moderna.
    - Implementar menú lateral interactivo (tipo Google Docs) con resaltado dinámico (ScrollSpy) y navegación por secciones.
