# SEC Chile Dashboard ⚡

Visualización de datos y análisis de resiliencia del sistema eléctrico chileno (2017-2025). Este proyecto es la capa de presentación y análisis estadístico del ecosistema **SEC Project**.

## 🔗 Relación con el ecosistema
Este repositorio contiene el **frontend y la lógica de visualización**. Se alimenta de los datos procesados por el backend principal:

*   **Proyecto Core (Backend/Scraper)**: [simonkey1/SEC](https://github.com/simonkey1/SEC)
    *   *Función*: Extracción de datos de la SEC, normalización en PostgreSQL y sincronización con Supabase.
*   **Este Repositorio (Visualización)**: [simonkey1/dashboard-sec](https://github.com/simonkey1/dashboard-sec)
    *   *Función*: Dashboard interactivo construido con SvelteKit, Tailwind CSS y LayerChart (D3).

## 🚀 Características
*   **Pulse Monitor**: Visualización interactiva de la serie de tiempo nacional.
*   **Deep Methodology**: Implementación de la metodología "Descripción Densa" para auditar la inversión vs. la realidad de los cortes.
*   **Mobile Optimized**: Diseño adaptativo robusto usando unidades `dvh` y sticky footer para máxima compatibilidad con navegadores móviles.
*   **Architecture Hybrid Medallion**: Visualización del pipeline de datos (Bronze -> Silver -> Gold).

## 🛠️ Stack Tecnológico
*   **Framework**: SvelteKit 5 (Runes).
*   **Styling**: CSS (Modern HSL variables) + Tailwind CSS.
*   **Visualización**: Svelte Charting + D3 logic.
*   **Backend**: Supabase (PostgreSQL).

## 💻 Instalación Local

```powershell
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun dev
```

## 📂 Estructura
*   `/src/lib/components`: Componentes de visualización (Mapas, Graficos de Pulso).
*   `/src/routes/metodologia`: Página interactiva con el manifesto de investigación.
*   `/docs`: Documentación detallada, informes técnicos y políticas de base de datos.
*   `/scripts`: Scripts de verificación de esquema y auditoría de datos.

---
*Desarrollado como parte de una investigación sobre la calidad del servicio eléctrico en Chile.*
