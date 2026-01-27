<script lang="ts" module>
    function i18nText(v: number) {
        if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
        if (v >= 1000) return (v / 1000).toFixed(0) + "K";
        return v.toString();
    }
</script>

<script lang="ts">
    import type { TimeSeriesData } from "$lib/types";
    import { scaleBand, scaleLinear } from "d3-scale";
    import { max } from "d3-array";
    import { ExternalLink } from "lucide-svelte";

    let { data = [] }: { data: TimeSeriesData[] } = $props();
    let hoveredData = $state<{ year: string; value: number } | null>(null);

    // Aggregate by Year
    const chartData = $derived(
        Object.entries(
            data.reduce(
                (acc, curr) => {
                    const date = new Date(curr.mes);
                    const year = date.getFullYear();
                    if (!isNaN(year) && year >= 2017 && year <= 2025) {
                        acc[year] = (acc[year] || 0) + (curr.afectados || 0);
                    }
                    return acc;
                },
                {} as Record<number, number>,
            ),
        )
            .map(([year, value]) => ({ year: year.toString(), value }))
            .sort((a, b) => parseInt(a.year) - parseInt(b.year)),
    );

    // Dimensions
    const height = 250;
    const padding = { top: 20, right: 10, bottom: 30, left: 40 };

    // Scales
    const x = $derived(
        scaleBand()
            .domain(chartData.map((d) => d.year))
            .range([padding.left, 1000 - padding.right]) // Using 1000 as base width for viewBox
            .padding(0.15),
    );

    const y = $derived(
        scaleLinear()
            .domain([0, max(chartData, (d) => d.value) || 0])
            .range([height - padding.bottom, padding.top]),
    );

    const xTicks = $derived(x.domain());
    const yTicks = $derived(y.ticks(5));
</script>

<div class="space-y-4 h-full flex flex-col">
    <div class="flex items-center justify-between">
        <a href="/metodologia#cronologia" class="group block">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-electric-cyan transition-colors flex items-center gap-2"
            >
                Tendencia Nacional de Fallas (2017-2025)
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity"
                />
            </h2>
        </a>
        <div class="flex items-center gap-2">
            <span class="text-[10px] text-slate-500 uppercase tracking-tighter"
                >Serie Histórica Validada</span
            >
        </div>
    </div>

    <!-- Manual SVG Implementation -->
    <div
        class="flex-1 min-h-[250px] relative rounded-xl bg-rich-black p-4 group"
    >
        {#if chartData.length > 0}
            <svg
                class="w-full h-full"
                viewBox="0 0 1000 {height}"
                preserveAspectRatio="none"
            >
                <!-- Grid -->
                {#each yTicks as tick}
                    <line
                        x1={padding.left}
                        x2={1000 - padding.right}
                        y1={y(tick)}
                        y2={y(tick)}
                        stroke="rgba(255,255,255,0.05)"
                        stroke-width="1"
                    />
                    <text
                        x={padding.left - 5}
                        y={y(tick) + 3}
                        text-anchor="end"
                        class="fill-slate-300 text-[10px] font-mono font-bold"
                    >
                        {i18nText(tick)}
                    </text>
                {/each}

                <!-- Bars -->
                <!-- Bars -->
                {#each chartData as d}
                    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                    <rect
                        x={x(d.year)}
                        y={y(d.value)}
                        width={x.bandwidth()}
                        height={y(0) - y(d.value)}
                        fill="var(--color-electric-cyan)"
                        rx="2"
                        class="hover:opacity-80 transition-opacity cursor-crosshair"
                        onmouseover={() => (hoveredData = d)}
                        onmouseout={() => (hoveredData = null)}
                        role="graphics-symbol"
                        aria-label="Barra de datos para el año {d.year} con un valor de {d.value}"
                    />
                    <!-- Chart Labels (Inside Bars) -->
                    {#if d.value > 1000000}
                        <text
                            x={(x(d.year) || 0) + x.bandwidth() / 2}
                            y={y(d.value) + 20}
                            text-anchor="middle"
                            class="fill-black text-[12px] font-black font-sans tracking-tighter"
                            style="pointer-events: none;"
                        >
                            {i18nText(d.value)}
                        </text>
                    {/if}

                    <!-- X Axis Label -->
                    <text
                        x={(x(d.year) || 0) + x.bandwidth() / 2}
                        y={height - 5}
                        text-anchor="middle"
                        class="fill-slate-400 text-[11px] font-mono font-bold"
                    >
                        {d.year}
                    </text>
                {/each}
                <!-- Annotations -->
                <g
                    transform="translate({(x('2017') || 0) +
                        x.bandwidth() / 2}, {y(5000000)})"
                >
                    <text
                        class="fill-white text-[9px] font-bold uppercase tracking-tight"
                        text-anchor="middle"
                        y="-25">Nevazón</text
                    >
                    <line y1="-20" y2="-12" stroke="white" stroke-width="1.5" />
                    <circle cy="-12" r="1.5" fill="white" />
                </g>

                <g
                    transform="translate({(x('2024') || 0) +
                        x.bandwidth() / 2}, {y(3000000)})"
                >
                    <text
                        class="fill-white text-[9px] font-bold uppercase tracking-tight"
                        text-anchor="middle"
                        y="-25">Viento</text
                    >
                    <line y1="-20" y2="-12" stroke="white" stroke-width="1.5" />
                    <circle cy="-12" r="1.5" fill="white" />
                </g>
            </svg>

            <!-- Custom Tooltip -->
            {#if hoveredData}
                <div
                    class="absolute top-4 right-4 bg-black/90 border border-cyan-500/30 p-3 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-xl pointer-events-none"
                >
                    <div
                        class="text-slate-400 text-[10px] font-mono uppercase mb-1"
                    >
                        Año {hoveredData.year}
                    </div>
                    <div
                        class="text-electric-cyan font-mono text-xl font-black"
                    >
                        {hoveredData.value.toLocaleString()}
                        <span class="text-[10px] text-white/50 font-normal ml-1"
                            >afectados</span
                        >
                    </div>
                </div>
            {/if}
        {:else}
            <div
                class="h-full flex items-center justify-center text-slate-600 text-xs italic"
            >
                <span>Cargando trazado... (Datos recibidos: {data.length})</span
                >
            </div>
        {/if}
    </div>
</div>
