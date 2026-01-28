import { writable, type Writable } from 'svelte/store';

// Define supported languages
export type Language = 'es' | 'en';

// Define the structure of our translations
export type Translations = {
    [key: string]: string;
};

// Dictionary of translations
const dictionary: Record<Language, Translations> = {
    es: {
        // Hero
        'hero.title.prefix': 'LA FRAGILIDAD DEL',
        'hero.title.highlight': 'SISTEMA',
        'hero.subtitle': 'Análisis sociotécnico de 6.2 millones de registros de interrupciones eléctricas en Chile. Una red que invierte billones pero que aún no logra la resiliencia climática.',

        // Stats/Bento
        'stats.clients': 'Clientes Analizados',
        'stats.events': 'Eventos de Corte',
        'stats.hours': 'Horas Sin Suministro',

        // Navigation / CTA
        'nav.research': 'Investigación',
        'nav.report': 'Reporte Técnico',
        'nav.dashboard': 'Dashboard',

        // Cards
        'card.roi_social': 'ROI de Inversión',
        'card.coquimbo': 'Paradoja Coquimbo',
        'card.arica': 'Cirugía Arica',
        'card.map': 'Mapa de Cicatrices',
        'card.friction': 'Fricción Forestal',
        'card.time_series': 'Monitor de Pulso',

        // Footer
        'footer.about': 'Sobre este proyecto',
        'footer.stack': 'Tech Stack',
        'footer.links': 'Enlaces',
        'footer.desc': 'Este sistema analiza 9 años de data pública de la SEC para revelar patrones de ineficiencia y desigualdad energética.',
        'footer.research': 'Metodología de "Descripción Densa"',

        // Common
        'common.view_code': 'Ver Código',
        'common.read_research': 'Leer Investigación',
        'common.loading': 'Cargando...',

        // Charts
        'chart.axis.date': 'Fecha',
        'chart.axis.value': 'Valor',
        'chart.tooltip.region': 'Región',
        'chart.tooltip.customers': 'Clientes',

        // About Section
        'about.title': 'Sobre el Proyecto',
        'about.architecture': 'Arquitectura',
        'about.insights': 'Hallazgos Clave',
        'about.data_volume': 'Volumen de Datos',
        'about.data_pipeline': 'Pipeline de Datos (ETL)',
        'about.frontend': 'Frontend',
        'about.database': 'Base de Datos',
        'about.pipeline_desc': 'Scrapers asíncronos + Normalización',
        'about.frontend_desc': 'SvelteKit + Tailwind + D3',
        'about.db_desc': 'PostgreSQL + Supabase',
        'about.insight_1': 'Patrones de ineficiencia identificados',
        'about.insight_2': 'ROI social calculado para infra',

        'chart.badge.validated': 'Serie Histórica Validada',
        'chart.tooltip.year': 'Año',
        'chart.tooltip.affected': 'casos afectados',
        'chart.loading': 'Cargando trazado...',
        'chart.annotations.snow': 'Nevazón',
        'chart.annotations.wind': 'Viento',

        'chart.roi.title': 'Muro de Ineficiencia',
        'chart.roi.desc': 'Mide el impacto social por dólar invertido en infraestructura.',
        'chart.roi.unit': 'Clientes / M$ USD',

        // Detailed Descriptions for Subtitles
        'chart.monitor.desc': 'Visualiza 9 años de interrupciones, destacando eventos climáticos extremos.',
        'chart.coquimbo.title': 'Paradoja de Coquimbo',
        'chart.coquimbo.desc': 'A pesar de ser hub renovable, sufre inestabilidad crónica.',
        'chart.arica.title': 'Cirugía Arica',
        'chart.arica.desc': 'Intervención crítica en la red del extremo norte (2024).',
        'chart.friction.title': 'Fricción Forestal',
        'chart.friction.badge': 'Clientes Afectados (Acumulado)',
        'chart.friction.desc': 'Correlación entre plantaciones forestales y cortes de suministro.',
        'chart.friction.note': '* En el sur, la caída de árboles sobre líneas anula la inversión macro-técnica.',
        'chart.map.title': 'Capa de Cicatrices',
        'chart.map.badge': 'Log de Eventos',
        'chart.map.desc': 'Mapeo geoespacial de fallas críticas y riesgos ambientales.',

        'chart.debate': 'Debate',
        'chart.debate.desc': '¿Es "Lag" (tiempo de adaptación) o Ineficiencia? El impacto positivo tardó 3 años.',

        // Map Points
        'map.point.arica.desc': 'REDENOR: Cierre de anillo técnico redujo fallas dramáticamente.',
        'map.point.antofagasta.desc': 'Desierto: Alta radiación y problemas de aislación por contaminación salina.',
        'map.point.coquimbo.desc': 'Paradoja: Obra 500kV no impactó la calidad local por 3 años.',
        'map.point.metro.desc': 'Nevazón 2017 y Viento 2024 exponen la fragilidad del tendido aéreo.',
        'map.point.lagos.desc': 'Fricción constante entre tendido eléctrico y monocultivo forestal.',
    },
    en: {
        // Hero
        'hero.title.prefix': 'THE FRAGILITY OF THE',
        'hero.title.highlight': 'SYSTEM',
        'hero.subtitle': 'Sociotechnical analysis of 6.2 million power outage records in Chile. A grid that invests billions but has yet to achieve climate resilience.',

        // Stats/Bento
        'stats.clients': 'Analyzed Customers',
        'stats.events': 'Outage Events',
        'stats.hours': 'Hours Without Supply',

        // Navigation / CTA
        'nav.research': 'Research',
        'nav.report': 'Technical Report',
        'nav.dashboard': 'Dashboard',

        // Cards
        'card.roi_social': 'Investment ROI',
        'card.coquimbo': 'Coquimbo Paradox',
        'card.arica': 'Arica Surgery',
        'card.map': 'Scar Map',
        'card.friction': 'Forest Friction',
        'card.time_series': 'Pulse Monitor',

        // Footer
        'footer.about': 'About this project',
        'footer.stack': 'Tech Stack',
        'footer.links': 'Links',
        'footer.desc': 'This system analyzes 9 years of public SEC data to reveal patterns of inefficiency and energy inequality.',
        'footer.research': '"Thick Description" Methodology',

        // Common
        'common.view_code': 'View Code',
        'common.read_research': 'Read Research',
        'common.loading': 'Loading...',

        // Charts
        'chart.axis.date': 'Date',
        'chart.axis.value': 'Value',
        'chart.tooltip.region': 'Region',
        'chart.tooltip.customers': 'Customers',
        'chart.tooltip.year': 'Year',
        'chart.tooltip.affected': 'affected cases',
        'chart.loading': 'Loading trace...',
        'chart.annotations.snow': 'Snowstorm',
        'chart.annotations.wind': 'Windstorm',

        // About Section
        'about.title': 'About the Project',
        'about.architecture': 'Architecture',
        'about.insights': 'Key Insights',
        'about.data_volume': 'Data Volume',
        'about.data_pipeline': 'Data Pipeline (ETL)',
        'about.frontend': 'Frontend',
        'about.database': 'Database',
        'about.pipeline_desc': 'Async Scrapers + Normalization',
        'about.frontend_desc': 'SvelteKit + Tailwind + D3',
        'about.db_desc': 'PostgreSQL + Supabase',
        'about.insight_1': 'Identified inefficiency patterns',
        'about.insight_2': 'Calculated social ROI for infrastructure',

        'chart.badge.validated': 'Validated Historical Series',
        'chart.roi.title': 'Inefficiency Wall',
        'chart.roi.desc': 'Measures social impact per dollar invested in infrastructure.',
        'chart.roi.unit': 'Clients / k$ USD',

        // Detailed Descriptions for Subtitles
        'chart.monitor.desc': 'Visualizes 9 years of outages, highlighting extreme weather events.',
        'chart.coquimbo.title': 'Coquimbo Paradox',
        'chart.coquimbo.desc': 'Despite being a renewable hub, it suffers from chronic instability.',
        'chart.arica.title': 'Arica Surgery',
        'chart.arica.desc': 'Critical intervention in the extreme north grid (2024).',
        'chart.friction.title': 'Forest Friction',
        'chart.friction.badge': 'Affected Customers (Accumulated)',
        'chart.friction.desc': 'Correlation between forestry plantations and supply outages.',
        'chart.friction.note': '* In the south, falling trees on lines nullify macro-technical investment.',
        'chart.map.title': 'Scar Map',
        'chart.map.badge': 'Event Log',
        'chart.map.desc': 'Geospatial mapping of critical failures and environmental risks.',

        'chart.debate': 'Debate',
        'chart.debate.desc': 'Is this "Lag" (adaptation time) or Inefficiency? Positive impact took 3 years.',

        // Map Points
        'map.point.arica.desc': 'REDENOR: Technical ring closure reduced failures dramatically.',
        'map.point.antofagasta.desc': 'Desert: High radiation and insulation problems due to saline pollution.',
        'map.point.coquimbo.desc': 'Paradox: 500kV work did not impact local quality for 3 years.',
        'map.point.metro.desc': '2017 Snowstorm and 2024 Windstorm expose overhead line fragility.',
        'map.point.lagos.desc': 'Constant friction between power lines and forestry monoculture.',
    }
};

function createLanguageStore() {
    // Try to get initial language from localStorage (browser only)
    let initialLang: Language = 'es';
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('lang');
        if (stored === 'en' || stored === 'es') {
            initialLang = stored;
        }
    }

    const { subscribe, set, update } = writable<Language>(initialLang);

    return {
        subscribe,
        set: (lang: Language) => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('lang', lang);
            }
            set(lang);
        },
        toggle: () => update(l => l === 'es' ? 'en' : 'es')
    };
}

export const language = createLanguageStore();

// Derived store or helper to get text
export function t(lang: Language, key: string): string {
    return dictionary[lang]?.[key] || key;
}

export { dictionary };
