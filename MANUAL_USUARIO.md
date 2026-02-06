# Manual de Usuario - AuraPOS Sistema POS/Inventario

## 📖 Introducción

Bienvenido a **AuraPOS**, tu sistema de gestión de ventas e inventario de próxima generación. AuraPOS es una solución completa diseñada para simplificar tus operaciones diarias, desde la gestión de productos hasta el análisis de tus ventas.

### 🚀 Acceso al Sistema

Para comenzar a usar AuraPOS:

1. **Inicia Sesión**: Ingresa tu email y contraseña en la pantalla de login
2. **Selecciona tu Rol**: El sistema reconocerá automáticamente tu rol (Vendedor o Dueño)
3. **Navega por los Módulos**: Usa el menú lateral o el atajo **Ctrl+K** para acceder rápidamente

### 👥 Roles del Sistema

#### 🔰 Vendedor
Tienes acceso a:
- **Ventas (POS)**: Registrar ventas y gestionar el carrito
- **Inventario**: Consultar productos y stock
- **Dashboard**: Ver estadísticas básicas

#### 👑 Dueño/Owner
Tienes acceso completo a:
- **Todos los módulos del vendedor**
- **Cierre de Caja**: Procesos diarios de cierre
- **Reportes Avanzados**: Análisis detallado y exportación

---

## 🛍️ Módulos según Rol

### 📋 Guía para el Vendedor

#### 💰 Módulo de Ventas (POS)

El punto de venta es tu herramienta principal para registrar transacciones:

**Características principales:**
- Catálogo de productos visual
- Búsqueda instantánea por nombre o SKU
- Carrito de compras con descuentos
- Confirmación visual de productos agregados

**Cómo funciona:**
1. Los productos aparecen como tarjetas con nombre y precio
2. Haz clic en cualquier producto para agregarlo al carrito
3. Usa la barra de búsqueda para encontrar productos rápidamente
4. Aplica descuentos porcentuales cuando sea necesario
5. Confirma la venta con el botón "Cobrar"

#### 📦 Gestión de Inventario Básica

Como vendedor, puedes consultar el inventario existente:

**Información disponible:**
- Nombre y SKU del producto
- Proveedor y stock actual
- Estado del stock (verde/amarillo/rojo)
- Indicadores visuales de disponibilidad

**Colores de stock:**
- 🟢 **Verde**: Stock normal (más de 15 unidades)
- 🟡 **Amarillo**: Stock bajo (entre 5-15 unidades)
- 🔴 **Rojo**: Stock crítico (menos de 5 unidades)

### 📊 Guía para el Dueño

#### 📈 Dashboard Analítico

Tu centro de control para tomar decisiones informadas:

**Widgets disponibles:**
- **Top 5 Productos**: Los más vendidos del período
- **Alertas de Stock**: Productos con stock bajo
- **Gráfico de Ventas**: Visualización semanal de facturación

**Personalización del Dashboard:**
- **Arrastra y suelta** los widgets para reorganizarlos
- **Colapsa** widgets que no necesites temporalmente
- **Exporta** datos de cada widget en Excel o PDF

#### 🔒 Cierre de Caja

Proceso completo para cerrar el día fiscal:

**Paso 1: Resumen del Día**
- Revisa ventas brutas y netas
- Observa el desglose por método de pago
- Consulta retiros registrados

**Paso 2: Proceso de Cierre**
- Ingresa el efectivo contado físicamente
- Explica cualquier discrepancia si es necesario
- Confirma el cierre para generar el registro

**Paso 3: Apertura del Siguiente Día**
- Confirma el saldo inicial
- Registra retiros si los hay
- Prepara la caja para el nuevo día

**Exportación de Informes:**
- **PDF**: Informe profesional completo
- **Excel**: Datos detallados para análisis

---

## 🎯 Guías Paso a Paso

### 💳 Cómo Realizar una Venta

#### Paso 1: Buscar Productos
```
Método 1: Visual
→ Navega por las tarjetas de productos
→ Haz clic en el producto deseado

Método 2: Búsqueda
→ Usa la barra de búsqueda superior
→ Escribe nombre o SKU (ej: "WHEY" o "NW-WHEY-VAN-1KG")
→ Selecciona de los resultados filtrados
```

#### Paso 2: Gestionar el Carrito
- **Agregar**: Los productos se añaden automáticamente
- **Eliminar**: Haz clic en el ícono de basura junto al producto
- **Ver totales**: El sistema calcula automáticamente

#### Paso 3: Aplicar Descuentos
```
1. Haz clic en el botón "Descuento" (ícono %)
2. Ingresa el porcentaje (ej: 10 para 10%)
3. El total se actualiza automáticamente
```

#### Paso 4: Confirmar Venta
- Revisa el carrito final
- Haz clic en "Cobrar"
- El sistema registra la transacción

### 📝 Cómo Cargar un Producto Nuevo

#### Paso 1: Acceder al Formulario
```
1. Ve al módulo "Inventario"
2. Haz clic en "+ Nuevo Producto"
3. Se abrirá el formulario de carga
```

#### Paso 2: Información Básica
**Campos obligatorios:**
- **Nombre**: Ej: "Proteína Whey Vainilla"
- **SKU**: Código único (ej: "NW-WHEY-VAN-1KG")
- **Proveedor**: Ej: "NutriFit Pro"
- **Stock inicial**: Cantidad numérica

#### Paso 3: Detalles del Producto
**Información adicional:**
- **Código de Barras**: Para escaneo rápido
- **Tamaño**: Ej: "1kg"
- **Sabor**: Ej: "Vainilla"
- **Marca**: Ej: "Optimum Nutrition"
- **Línea**: Ej: "Gold Standard"
- **Formato**: Polvo, Líquido, Cápsulas o Tabletas
- **Peso**: Ej: "1000g"
- **Nombre Comercial**: Nombre completo para display

#### Paso 4: Características Especiales
**Marcas importantes para clientes:**
- ✅ **Orgánico**: Producto certificado orgánico
- ✅ **Sin TACC**: Libre de gluten (celíacos)
- ✅ **Vegano**: Sin ingredientes de origen animal

#### Paso 5: Guardar
```
1. Revisa todos los campos
2. Haz clic en "Agregar Producto"
3. Recibirás confirmación visual
```

### 🏪 Cómo Gestionar Stock Intersucursal

#### Paso 1: Seleccionar Sucursal
```
1. En el módulo Inventario, busca el selector superior
2. Elige la sucursal deseada del menú desplegable
3. El sistema mostrará el stock de esa ubicación
```

#### Paso 2: Consultar Stock por Sucursal
- Cada sucursal muestra su stock independiente
- Los colores indican el estado en cada ubicación
- Puedes cambiar rápidamente entre sucursales

#### Paso 3: Identificar Necesidades de Transferencia
- **Stock crítico**: Considera transferir desde otra sucursal
- **Stock bajo**: Planifica reposición o transferencia
- **Stock normal**: Mantén niveles actuales

---

## 📊 Dashboard y Gráficos

### 📈 Interpretación de Histogramas

El gráfico de ventas muestra:

**Eje X (Horizontal):** Días de la semana
- Lun, Mar, Mié, Jue, Vie, Sáb, Dom

**Eje Y (Vertical):** Valores monetarios
- **Facturación**: Ingresos totales (barra azul)
- **Ventas**: Ingresos netos (barra verde)

**Cómo interpretar:**
- **Barras altas**: Días de mayor actividad
- **Diferencia entre barras**: Impacto de descuentos
- **Tendencia semanal**: Patrones de comportamiento

### 🎨 Personalización de la Vista

#### Arrastrar Widgets
```
1. Haz clic y mantén presionado cualquier widget
2. Arrástralo a la nueva posición
3. Suelta para colocar en su nueva ubicación
```

#### Colapsar/Expandir
```
1. Busca el ícono de flecha en cada widget
2. Haz clic para colapsar (minimizar)
3. Vuelve a hacer clic para expandir
```

#### Exportar Datos
```
1. En cada widget, busca el ícono de descarga
2. Elige formato PDF o Excel
3. El archivo se descargará automáticamente
```

---

## ⌨️ Atajos de Teclado

### 🚀 Comando Rápido (Ctrl+K)

El atajo más importante del sistema:

**Cómo activarlo:**
- Presiona **Ctrl+K** (o **Cmd+K** en Mac)
- Aparecerá una ventana de búsqueda

**Comandos disponibles:**
- **Dashboard**: "Ver resumen de alertas y actividad"
- **Módulo de ventas**: "Gestionar transacciones y carrito"
- **Control de Inventario**: "Gestionar productos y proveedores"
- **Cierre de Caja**: "Realizar cierre diario de ventas"

**Uso eficiente:**
- Escribe parte del comando (ej: "inv" para Inventario)
- Usa las flechas para navegar
- Presiona Enter para seleccionar
- Presiona ESC para cancelar

### 📝 Otros Atajos Útiles

**En el módulo de ventas:**
- **Tab**: Navegar entre campos
- **Enter**: Confirmar selección
- **Escape**: Cancelar acción actual

**En formularios:**
- **Tab**: Siguiente campo
- **Shift+Tab**: Campo anterior
- **Enter**: Guardar (cuando está disponible)

---

## ❓ Preguntas Frecuentes

### 🔐 Problemas de Acceso

**P:** "No puedo iniciar sesión"
```
R: Verifica:
✓ Email y contraseña correctos
✓ Sin espacios extra
✓ Mayúsculas/minúsculas correctas
```

**P:** "Me dice 'Acceso denegado'"
```
R: Revisa:
✓ Tu rol tiene permiso para ese módulo
✓ Contacta al administrador si necesitas más permisos
```

### 🛒 Problemas con Ventas

**P:** "No encuentro un producto"
```
R: Intenta:
✓ Buscar por SKU completo
✓ Buscar por parte del nombre
✓ Verificar que exista en el inventario
```

**P:** "El descuento no se aplica"
```
R: Revisa:
✓ El porcentaje es un número válido
✓ No hay caracteres especiales
✓ El campo no está vacío
```

### 📦 Problemas con Inventario

**P:** "No puedo agregar un producto nuevo"
```
R: Verifica campos obligatorios:
✓ Nombre del producto
✓ SKU único
✓ Proveedor
✓ Stock inicial (número)
```

**P:** "El SKU ya existe"
```
R: Solución:
✓ Usa un SKU diferente
✓ Agrega sufijo de lote o fecha
✓ Verifica que no exista duplicado
```

### 💰 Problemas con Cierre de Caja

**P:** "No puedo cerrar la caja"
```
R: Revisa:
✓ Has ingresado el efectivo contado
✓ Si hay diferencia, has explicado el motivo
✓ Todos los campos requeridos están completos
```

**P:** "El PDF no se descarga"
```
R: Intenta:
✓ Revisar configuración del navegador
✓ Permitir descargas automáticas
✓ Intentar con Excel como alternativa
```

### 🎯 Problemas de Validación

**P:** "Campos con borde rojo"
```
R: Significa:
✓ El campo es obligatorio
✓ El formato no es válido
✓ Hay caracteres no permitidos
```

**P:** "Mensaje de 'validación fallida'"
```
R: Solución:
✓ Revisa todos los campos marcados
✓ Completa los datos faltantes
✓ Corrige el formato si es necesario
```

### 🔧 Problemas Técnicos

**P:** "La página se carga lento"
```
R: Intenta:
✓ Recargar la página (F5)
✓ Verificar conexión a internet
✓ Cerrar otras pestañas pesadas
```

**P:** "Los gráficos no se ven"
```
R: Revisa:
✓ El navegador está actualizado
✓ JavaScript está habilitado
✓ No hay bloqueadores de contenido
```

---

## 📞 Soporte y Contacto

Si necesitas ayuda adicional:

**Horario de soporte:** Lunes a Viernes, 9:00 - 18:00 hs
**Email:** soporte@aurapos.com
**Teléfono:** +54 11 1234-5678

**Antes de contactar:**
1. Revisa este manual
2. Intenta recargar la página
3. Anota el mensaje de error exacto
4. Describe lo que estabas haciendo

---

## 📝 Notas Finales

**Consejos para el éxito:**
- Usa **Ctrl+K** frecuentemente para navegar rápido
- Mantén tu inventario actualizado
- Revisa las alertas de stock diariamente
- Cierra la caja correctamente cada día

**Recordatorio:** AuraPOS está diseñado para simplificar tu trabajo. Si algo parece complicado, probablemente haya una forma más fácil de hacerlo.

**¡Gracias por usar AuraPOS!** 🎉

---

*Versión del manual: 1.0.0*  
*Última actualización: Enero 2026*  
*Compatible con AuraPOS v1.0.0*
