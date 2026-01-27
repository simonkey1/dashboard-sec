# Guía de Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en [Vercel](https://vercel.com) con cero configuración.

## Requisitos Previos

1.  Tener una cuenta en [Vercel](https://vercel.com/signup).
2.  Tener el proyecto subido a tu GitHub (ya realizado: `https://github.com/simonkey1/dashboard-sec`).

## Pasos para Desplegar

1.  **Nuevo Proyecto**: En tu dashboard de Vercel, haz clic en "Add New..." -> "Project".
2.  **Importar Git**: Selecciona el repositorio `dashboard-sec`.
3.  **Configurar Build**:
    *   **Framework Preset**: SvelteKit (debería detectarse automáticamente).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `vite build` (u `npm run build` que ejecuta `svelte-kit sync && vite build` según nuestro `package.json`).
    *   **Output Directory**: (Dejar en blanco/default).
4.  **Variables de Entorno**: Despliega la sección "Environment Variables" y agrega las siguientes claves (copiar valores de tu `.env` local):
    *   `PUBLIC_SUPABASE_URL`
    *   `PUBLIC_SUPABASE_ANON_KEY`
5.  **Deploy**: Haz clic en "Deploy".

## Verificación

Una vez desplegado:
*   Vercel te dará una URL (ej: `dashboard-sec.vercel.app`).
*   Ingresa y verifica que los gráficos carguen (esto confirma que la conexión a Supabase funciona).
*   Navega a /metodologia para verificar que el contenido Markdown se renderiza correctamente (`mdsvex`).

## Solución de Problemas Comunes

*   **Error 500 en gráficos**: Verifica que las variables de entorno estén copiadas EXACTAMENTE igual que en tu `.env`.
*   **Estilos rotos**: Asegúrate de que `tailwind.config.ts` esté incluido en el repositorio (lo está).
