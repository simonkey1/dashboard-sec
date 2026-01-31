# SEC Chile Dashboard ⚡

Data visualization and resilience analysis of the Chilean electrical system (2017-2025). This project serves as the presentation and statistical analysis layer of the **SEC Project** ecosystem.

## 🔗 Ecosystem Relationship
This repository contains the **frontend and visualization logic**. It is fed by data processed by the main backend:

*   **Core Project (Backend/Scraper)**: [simonkey1/SEC](https://github.com/simonkey1/SEC)
    *   *Function*: Data extraction from SEC, normalization in PostgreSQL, and synchronization with Supabase.
*   **This Repository (Visualization)**: [simonkey1/dashboard-sec](https://github.com/simonkey1/dashboard-sec)
    *   *Function*: Interactive dashboard built with SvelteKit, Tailwind CSS, and LayerChart (D3).

## 🚀 Features
*   **Pulse Monitor**: Interactive visualization of the national time series (near-real time).
*   **Thick Description**: Implementation of the "Thick Description" methodology to audit investment vs. the reality of power outages.
*   **Mobile Optimized**: Robust adaptive design using `dvh` units and sticky footer for maximum compatibility with mobile browsers.
*   **Architecture Hybrid Medallion**: Implementation of an optimized data pipeline to handle massive volumes of information with minimal cloud costs.
    *   **Bronze Layer (Local - Raw)**: ~3.7 GBs of raw JSON Snapshots extracted from SEC.
    *   **Silver Layer (Local - Clean)**: Local PostgreSQL with 6.2M deduplicated and normalized rows.
    *   **Gold Layer (Cloud - Business)**: Supabase with pre-calculated metrics (~10MBs), achieving minimal latency and extreme savings in Request Units.

## 🛠️ Technology Stack
*   **Framework**: SvelteKit 5 (Runes).
*   **Styling**: CSS (Modern HSL variables) + Tailwind CSS.
*   **Visualization**: Svelte Charting + D3 logic.
*   **Backend**: Supabase (PostgreSQL).

## 💻 Local Installation

```powershell
# Install dependencies
bun install

# Start development server
bun dev
```

## 📂 Structure
*   `/src/lib/components`: Visualization components (Maps, Pulse Charts).
*   `/src/routes/research`: Interactive page with the research manifesto.
*   `/docs`: Detailed documentation, technical reports, and database policies.
*   `/scripts`: Schema verification and data audit scripts.

---
*Developed as part of an investigation into the quality of electrical service in Chile.*
