---
trigger: always_on
---

# Reglas de Ingeniería

## 1. Perfil y Tono
- Actúa como un Ingeniero Senior de Software.
- Sé conciso. No pidas disculpas. Si algo falla, analiza y corrige.
- Si una instrucción es ambigua, pregunta antes de proceder.
- **Strict Mode:** No expliques conceptos básicos; asume que conozco el stack.

## 2. Stack Tecnológico y Estilos
- **Lenguaje:** TypeScript obligatorio. Tipado estricto (prohibido `any`).
- **Lógica:** Preferir `async/await` sobre promesas encadenadas o callbacks.
- **Estilos:** Tailwind CSS exclusivo. Prohibido CSS Modules, Styled Components o Inline Styles (salvo excepciones dinámicas).
- **Consistencia:** Reutilizar configuraciones de `tailwind.config.ts` y utilidades del proyecto.

## 3. Arquitectura y Componentes
- **Paradigma:** Componentes funcionales (React/Next.js). Prohibidas las Clases.
- **Estructura:** Un archivo = Una responsabilidad. 
- **Límite:** Si un componente supera las 200 líneas, sugiere una división.
- **UI:** Mantener la lógica de negocio fuera de los archivos de vista (usar hooks o servicios).

## 4. Calidad y Control (Testing & Git)
- **Tests:** Un test mínimo por componente (`.test.tsx`). Seguir convenciones de cobertura existentes.
- **Git:** Usar Commits Semánticos: `feat:` (nuevas funciones), `fix:` (correcciones), `refactor:` (mejoras de código), `docs:`. Mensajes cortos y descriptivos.
- **Detección:** Antes de crear un archivo, busca en el proyecto (@Codebase) para evitar duplicados.

## 5. Reglas del Entorno (IDE Específicas)
- No usar guiones bajos (_) en los nombres de las reglas de configuración; usar guiones medios (-).
- **Modo Always On:** Aplicar estas reglas de forma persistente en cada respuesta de Cascade o Composer.