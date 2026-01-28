<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import PulseMonitor from "$lib/components/PulseMonitor.svelte";
    import CoquimboParadox from "$lib/components/CoquimboParadox.svelte";
    import AricaSurgery from "$lib/components/AricaSurgery.svelte";
    import ForestFriction from "$lib/components/ForestFriction.svelte";
    import ChileMapAnnotations from "$lib/components/ChileMapAnnotations.svelte";

    import { language } from "$lib/stores/language";

    let { data } = $props();
    const stats = $derived(data.stats ?? {});

    // We split the content into static sections to interleave components manually
    // This is safer than using a custom renderer which might have Svelte 5 compatibility issues
    const fullContent = $derived(
        $language === "en"
            ? data.paperContentEn || ""
            : data.paperContentEs || "",
    );

    // Split points based on figure placeholders
    const sections = $derived(() => {
        const parts = fullContent.split(
            /!\[(?:Figura|Figure) \d+: .*\]\(.*\)/g,
        );
        return parts;
    });

    const getStats = () => stats;

    function processMarkdown(text: string) {
        if (!text) return "";
        let processed = text;

        // Fix Tips
        processed = processed.replace(
            /“?\[!TIP\] (.*?)”?\n/g,
            '<div class="bg-electric-cyan/10 border-l-4 border-electric-cyan p-4 my-6 rounded-r-lg"><strong class="text-electric-cyan block mb-1">💡 INSIGHT</strong>$1</div>',
        );

        // Fix Disclaimers
        processed = processed.replace(
            /“?\[!DISCLAIMER\] (.*?)”?\n/g,
            '<div class="bg-amber-alert/10 border-l-4 border-amber-alert p-4 my-6 rounded-r-lg"><strong class="text-amber-alert block mb-1">⚠️ DISCLAIMER</strong>$1</div>',
        );

        // Fix Notes
        processed = processed.replace(
            /> \[!NOTE\]\s*\n>\s*(.*?)(?=\n\n|$)/gs,
            (match, content) => {
                const formatted = content
                    .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-white">$1</strong>',
                    )
                    .replace(
                        /\*(.*?)\*/g,
                        '<em class="text-slate-200">$1</em>',
                    );
                return `<div class="bg-slate-700/50 border-l-4 border-slate-500 p-4 my-6 rounded-r-lg italic text-slate-300"><strong class="text-white block mb-1 not-italic">📝 NOTA</strong>${formatted}</div>`;
            },
        );

        // Inject Anchor IDs for Dashboard Navigation
        // 1. Social ROI (Inefficiency Wall) -> Section 1.1 or 1.3
        processed = processed.replace(
            /(### 1.1 Marco Teórico: De la Confiabilidad a la Justicia Energética)/,
            '<div id="roi-social" class="scroll-mt-24"></div>\n\n$1',
        );

        // 2. Pulse Monitor (Timeline) -> Figure 1 / Section 2
        processed = processed.replace(
            /(## 2. Metodología: Escuchando al Dato Crudo)/,
            '<div id="cronologia" class="scroll-mt-24"></div>\n\n$1',
        );

        // 3. Chile Map (Cicatrices) -> Methodology Explanation (Why we selected)
        processed = processed.replace(
            /(En segundo lugar, seleccionamos cuatro estudios de caso)/,
            '<div id="cicatrices" class="scroll-mt-24"></div>\n\n$1',
        );

        // 4. Coquimbo (Paradox) -> Section 3.1
        processed = processed.replace(
            /(### 3.1 La Paradoja de Coquimbo \(El Gigante Dormido\))/,
            '<div id="coquimbo" class="scroll-mt-24"></div>\n\n$1',
        );

        // 5. Arica (Surgery) -> Section 3.2
        processed = processed.replace(
            /(### 3.2 La Cirugía del Desierto \(REDENOR\))/,
            '<div id="arica" class="scroll-mt-24"></div>\n\n$1',
        );

        // 6. Forest Friction (Muro Verde) -> Section 3.3
        processed = processed.replace(
            /(### 3.3 La Furia del Sur \(Pichirropulli\))/,
            '<div id="muro-verde" class="scroll-mt-24"></div>\n\n$1',
        );

        // Fix LaTeX Formula - Robust String Replacement using explicit placeholder
        const formulaContentEs = `<div class="bg-electric-cyan/5 border-l-4 border-electric-cyan p-6 my-8 rounded-r-lg shadow-lg">
<h3 class="text-electric-cyan font-bold text-lg mb-4 flex items-center gap-2">
💡 Caja de Conceptos: ¿Qué medimos cuando medimos cortes?
</h3>
<ul class="list-disc pl-5 space-y-2 text-slate-300 mb-6 text-sm">
<li><strong class="text-white">SAIFI Oficial:</strong> Depura los "Eventos de Fuerza Mayor" (climáticos). Es como medir la fiebre ignorando la gripe. <em class="text-slate-500">Promedio: ~3.5-4.5.</em></li>
<li><strong class="text-white">Raw SAIFI (Nuestro Indicador):</strong> Considera <em class="text-white">todas</em> las interrupciones.</li>
</ul>
<div class="my-6 p-6 bg-slate-900 rounded-xl border border-white/10 text-center font-mono relative overflow-hidden group">
<div class="absolute inset-0 bg-electric-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="inline-flex items-center gap-4 text-base md:text-lg relative z-10">
<span class="text-rose-500 font-bold">Raw SAIFI</span>
<span class="text-slate-500">=</span>
<div class="flex flex-col items-center">
<span class="border-b border-slate-500 px-4 pb-1 text-white">∑ Clientes Afectados (Total)</span>
<span class="pt-1 text-slate-400 text-xs">Total Clientes (6.5M)</span>
</div>
</div>
</div>
<p class="text-xs text-slate-400 italic text-center">
Valores estimados: 2017 (~16.2), 2024 (Pico por viento). <strong class="text-rose-500">La brecha es de casi 4x.</strong>
</p>
</div>`;

        const formulaContentEn = `<div class="bg-electric-cyan/5 border-l-4 border-electric-cyan p-6 my-8 rounded-r-lg shadow-lg">
<h3 class="text-electric-cyan font-bold text-lg mb-4 flex items-center gap-2">
💡 Concept Box: What do we measure when wait measure outages?
</h3>
<ul class="list-disc pl-5 space-y-2 text-slate-300 mb-6 text-sm">
<li><strong class="text-white">Official SAIFI:</strong> Filters out "Force Majeure Events" (weather). It's like measuring fever while ignoring the flu. <em class="text-slate-500">Average: ~3.5-4.5.</em></li>
<li><strong class="text-white">Raw SAIFI (Our Indicator):</strong> Considers <em class="text-white">all</em> interruptions.</li>
</ul>
<div class="my-6 p-6 bg-slate-900 rounded-xl border border-white/10 text-center font-mono relative overflow-hidden group">
<div class="absolute inset-0 bg-electric-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="inline-flex items-center gap-4 text-base md:text-lg relative z-10">
<span class="text-rose-500 font-bold">Raw SAIFI</span>
<span class="text-slate-500">=</span>
<div class="flex flex-col items-center">
<span class="border-b border-slate-500 px-4 pb-1 text-white">∑ Affected Customers (Total)</span>
<span class="pt-1 text-slate-400 text-xs">Total Customers (6.5M)</span>
</div>
</div>
</div>
<p class="text-xs text-slate-400 italic text-center">
Estimated values: 2017 (~16.2), 2024 (Windstorm Peak). <strong class="text-rose-500">The gap is nearly 4x.</strong>
</p>
</div>`;

        const formulaComponent =
            $language === "en" ? formulaContentEn : formulaContentEs;

        processed = processed.replace(
            /<!-- COMPONENT: CONCEPT_BOX -->/g,
            formulaComponent,
        );

        // Fix potential double-hashing if SvelteMarkdown doesn't parse it (Force H2 styling for specific headers if they remain raw)
        processed = processed.replace(/^## (.*)/gm, "<h2>$1</h2>");

        return processed;
    }
</script>

<div
    class="max-w-4xl mx-auto prose prose-invert prose-emerald p-4 md:p-12 glass rounded-3xl border border-white/5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 wrap-break-word overflow-x-hidden"
>
    {#if sections().length > 0}
        <!-- Section 1: Intro up to Fig 1 -->
        <SvelteMarkdown source={processMarkdown(sections()[0])} />

        <!-- Fig 1 -->
        <div
            class="not-prose my-12 p-8 bg-black/60 rounded-2xl border border-white/10 h-[450px]"
        >
            <PulseMonitor data={stats["time_series"] || []} />
        </div>

        <!-- Section 2: After Fig 1 up to Fig 2 -->
        {#if sections().length > 1}
            <SvelteMarkdown source={processMarkdown(sections()[1])} />

            <!-- Fig 2 -->
            <div
                class="not-prose my-12 p-4 md:p-8 bg-black/60 rounded-2xl border border-white/10 h-auto md:h-[850px]"
            >
                <ChileMapAnnotations />
            </div>
        {/if}

        <!-- Section 3: After Fig 2 up to Fig 3 -->
        {#if sections().length > 2}
            <SvelteMarkdown source={processMarkdown(sections()[2])} />

            <!-- Fig 3 -->
            <div
                class="not-prose my-12 p-8 bg-black/60 rounded-2xl border border-white/10 h-[400px]"
            >
                <CoquimboParadox
                    data={stats["time_series"]?.filter((d: any) =>
                        (d.nombre_region || d.region)?.includes("COQUIMBO"),
                    ) || []}
                />
            </div>
        {/if}

        <!-- Section 4: After Fig 3 up to Fig 4 -->
        {#if sections().length > 3}
            <SvelteMarkdown source={processMarkdown(sections()[3])} />

            <!-- Fig 4 -->
            <div
                class="not-prose my-12 p-8 bg-black/60 rounded-2xl border border-white/10 h-[400px]"
            >
                <AricaSurgery
                    data={stats["time_series"]?.filter(
                        (d: any) =>
                            (d.nombre_region || d.region) ===
                                "ARICA Y PARINACOTA" ||
                            (d.nombre_region || d.region)?.includes("ARICA"),
                    ) || []}
                />
            </div>
        {/if}

        <!-- Section 5: After Fig 4 up to Fig 5 -->
        {#if sections().length > 4}
            <SvelteMarkdown source={processMarkdown(sections()[4])} />

            <!-- Fig 5 -->
            <div
                class="not-prose my-12 p-8 bg-black/60 rounded-2xl border border-white/10"
            >
                <ForestFriction data={stats["company_ranking"] || []} />
            </div>
        {/if}

        <!-- Final Sections -->
        <!-- Section 6: Gap de la Percepción (Fig 1 Repeat) -->
        {#if sections().length > 5}
            <SvelteMarkdown source={processMarkdown(sections()[5])} />
        {/if}

        <!-- Final Sections (References, etc.) -->
        {#each sections().slice(6) as extra}
            <SvelteMarkdown source={processMarkdown(extra)} />
        {/each}
    {:else}
        <div class="text-center p-12 italic text-slate-500">
            Cargando manifesto...
        </div>
    {/if}
</div>
