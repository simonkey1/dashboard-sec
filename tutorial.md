# Tutorial: Ecosistema "Estado de la Red" (SEC Chile)

Bienvenido a la guía técnica del proyecto. Este documento explica cómo hemos construido este monitor de infraestructura utilizando las tecnologías más modernas de 2026.

## 1. El Motor: Bun y SvelteKit
En lugar de Node.js, este proyecto utiliza **Bun**.
- **Bun**: Es un runtime de JavaScript increíblemente rápido que también maneja la instalación de paquetes (`bun add`) y la ejecución de scripts (`bun run dev`).
- **SvelteKit**: Es el framework que orquestra todo. Maneja las rutas (en `src/routes`), el renderizado en el servidor y la hidratación en el cliente.

### Estructura de Carpetas
```text
src/
├── lib/               # Código compartido
│   ├── components/    # Gráficos y UI (PulseMonitor, ChileMap, etc.)
│   ├── supabase.ts    # Conexión a la base de datos
│   └── types.ts       # Definiciones de datos (TypeScript)
└── routes/            # Páginas de la app
    ├── +layout.svelte # Marco común (Siderbar, Navbar)
    ├── /              # Dashboard Principal
    ├── /metodologia  # El Manifesto (Research Paper + Figuras)
    └── /reporte       # Detalles de ingeniería
```

---

## 2. El Paradigma: Svelte 5 (Runes)
Este proyecto usa **Svelte 5**, que introduce el concepto de **Runes**. Ya no usamos `let variable = 0` y esperamos que "mágicamente" se actualice. Ahora somos explícitos:

- **$state**: Declara una variable reactiva.
  ```javascript
  let count = $state(0); 
  ```
- **$derived**: Crea una variable que depende de otra (como una "computada").
  ```javascript
  let double = $derived(count * 2);
  ```
- **$props**: La forma moderna de recibir datos de un padre.
  ```javascript
  let { data } = $props();
  ```

---

## 3. Estética: Tailwind CSS v4
Usamos **Tailwind CSS v4** para el diseño premium. A diferencia de las versiones anteriores, v4 es mucho más rápido y se configura principalmente en el CSS.
- **Glassmorphism**: Usamos `backdrop-blur` y bordes sutiles para el look moderno.
- **Colores**: Hemos definido una paleta personalizada en `layout.css`:
  - `electric-cyan`: Para éxitos y modernidad.
  - `neon-red`: Para fallas y fragilidad.
  - `rich-black`: El fondo profundo de la app.

---

## 4. Visualización de Datos: LayerChart + D3
Para los gráficos, no usamos librerías de "caja negra" cerradas. Usamos **LayerChart**, que es una capa sobre **D3.js** diseñada para Svelte.

### ¿Cómo se hace un gráfico aquí?
1. **D3**: Maneja las escalas (convertir un número de clientes en píxeles).
2. **LayerChart components**:
   - `<Chart>`: El contenedor que recibe la data.
   - `<Axis>`: Dibuja las líneas de guía.
   - `<Line>` / `<Area>` / `<Bar>`: Dibujan la data real.
   - `<Tooltip>`: La ventana flotante que aparece al pasar el mouse.

**Ejemplo de un "Tooltip" premium:**
```svelte
<Tooltip.Root let:data>
    <div class="bg-black/90 p-4 rounded-xl border border-white/20 backdrop-blur-3xl">
        <div class="text-xs uppercase text-slate-400">{data.label}</div>
        <div class="text-2xl font-black">{data.value}</div>
    </div>
</Tooltip.Root>
```

---

## 5. Arquitectura de Datos: Supabase
La app está conectada a **Supabase** (Postgres). 
- Los datos de los 6.2M de registros fueron procesados en Python/SQL y subidos a una tabla llamada `dashboard_stats`.
- Cada página consulta estos datos mediante un "load function" en archivos `+page.ts` o `+page.server.ts`.

> [!TIP]
> **Arquitectura Medallion**: Los datos crudos (Bronce) se limpian (Plata) y finalmente se agregan en las tablas de estadísticas que alimentan este dashboard (Oro).

---

## 6. Resolución de Problemas (Troubleshooting)
Si ves un **Error 500**:
- Generalmente significa que el servidor no pudo leer el archivo de investigación o falló la conexión con Supabase. Asegúrate de que el `.env` esté configurado correctamente y que el archivo `research_paper.md` exista en la raíz.
