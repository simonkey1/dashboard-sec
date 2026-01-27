<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    const content = `
# Informe Técnico: Ingeniería de Datos y Metodología

## 1. Introducción: La Arquitectura del Dato
Este proyecto detalló la ingeniería para construir un dataset de 6.2 millones de registros. Requirió una infraestructura ETL capaz de reconstruir la historia de las interrupciones eléctricas a partir de "trazos efímeros" publicados por el regulador.

### Diagrama de Flujo
1. **SEC API**: Snapshot Polling cada 10 minutos.
2. **Scraper Worker**: Captura asíncrona con rotación de User-Agents.
3. **Transformer**: Generación de \`hash_id\` para unicidad.
4. **Local PostgreSQL**: Almacenamiento Silver Layer (Deduplicado).
5. **Supabase**: Capa Gold (Métricas agregadas para Dashboard).

---

## 2. Estrategia de Extracción y Limpieza

### 2.1 El Desafío: Datos Efímeros
La SEC no ofrece un histórico; solo una "foto" actual. Implementamos un sistema de polling inteligente para capturar estos snapshots antes de que desaparezcan.

### 2.2 De Snapshot a Evento
Definimos un evento mediante **Hashing MD5** basado en la tupla \`(Comuna, Empresa, Fecha, Hora, Afectados)\`. Esto permite identificar un mismo corte a lo largo de múltiples snapshots sin duplicar la estadística final.

---

## 3. Arquitectura "Hybrid Medallion"
Para optimizar costos y escala, implementamos un patrón que desacopla el procesamiento pesado del consumo ligero:

1.  **Bronze Layer (Local - Raw)**:
    *   *Datos*: ~100 GBs de Snapshots JSON crudos.
2.  **Silver Layer (Local - Clean)**:
    *   *Datos*: PostgreSQL local con 6.2M de filas deduplicadas.
3.  **Gold Layer (Cloud - Business)**:
    *   *Datos*: Supabase con métricas pre-calculadas (~10MBs).
    *   *Ventaja*: Latencia mínima y ahorro extremo en Request Units (Cloud).

---

## 4. Diccionario de Datos Clave: \`fact_interrupciones\`

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| \`hash_id\` | PK (MD5) | Clave única de deduplicación. |
| \`clientes_afectados\` | Int | Número de hogares sin servicio. |
| \`id_geografia\` | FK | Enlace a dimensión normalizada de regiones. |
| \`id_tiempo\` | FK | Jerarquía temporal (Año > Mes > Día). |

---

## 5. Monitoreo del Pipeline
Garantizamos la integridad mediante dos métricas:
- **Volumen de Ingesta**: Monitoreo de consistencia histórica desde 2017.
- **Cobertura Horaria**: Mapa de Calor (Hora vs Día) para asegurar que el scraper opera 24/7 sin puntos ciegos.
`;
</script>

<div
    class="max-w-4xl mx-auto prose prose-invert prose-emerald p-8 glass rounded-3xl border border-slate-800 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
>
    <SvelteMarkdown source={content} />
</div>
