<script lang="ts">
    import { scaleBand, scaleLinear } from "d3-scale";
    import { max } from "d3-array";
    import { ExternalLink } from "lucide-svelte";
    import type { TimeSeriesData } from "$lib/types";

    let { data = [] }: { data: TimeSeriesData[] } = $props();

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
            .map(([year, value]) => ({ year: parseInt(year), value }))
            .sort((a, b) => a.year - b.year),
    );

    let hoveredData = $state<{ year: number; value: number } | null>(null);

    // Dimensions
    const height = 250;
    const padding = { top: 20, right: 10, bottom: 30, left: 40 };

    // Scales (Standardized Vertical Bar Chart)
    const x = $derived(
        scaleBand()
            .domain(chartData.map((d) => d.year.toString()))
            .range([padding.left, 1000 - padding.right])
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
        <a href="/research#arica" class="group block cursor-pointer">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-electric-cyan transition-all flex items-center gap-2 border-b border-transparent group-hover:border-electric-cyan/30 w-fit pb-1"
            >
                Arica: Redundancia Exitosa (REDENOR)
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity"
                />
            </h2>
        </a>
        <div class="flex items-center gap-2">
            <span class="text-[10px] text-electric-cyan font-mono uppercase"
                >Éxito Técnico</span
            >
        </div>
    </div>

    <!-- Manual SVG Chart (Standardized Vertical Bars) -->
    <div
        class="flex-1 min-h-[250px] relative rounded-xl bg-rich-black p-4 group"
    >
        {#if chartData.length > 0}
            <svg
                class="w-full h-full"
                viewBox="0 0 1000 {height}"
                preserveAspectRatio="none"
            >
                <!-- Grid Y -->
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
                        {tick >= 1000 ? (tick / 1000).toFixed(0) + "K" : tick}
                    </text>
                {/each}

                <!-- Bars -->
                {#each chartData as d}
                    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                    <rect
                        x={x(d.year.toString())}
                        y={y(d.value)}
                        width={x.bandwidth()}
                        height={y(0) - y(d.value)}
                        fill="var(--color-electric-cyan)"
                        class="hover:opacity-80 transition-opacity cursor-crosshair"
                        rx="2"
                        onmouseover={() => (hoveredData = d)}
                        onmouseout={() => (hoveredData = null)}
                        role="graphics-symbol"
                        aria-label="Barra de datos para el año {d.year} con un valor de {d.value}"
                    />
                    <!-- Chart Labels (Inside Bars) -->
                    {#if d.value > 100}
                        <text
                            x={(x(d.year.toString()) || 0) + x.bandwidth() / 2}
                            y={y(d.value) + 15}
                            text-anchor="middle"
                            class="fill-black text-[11px] font-black font-sans tracking-tighter"
                            style="pointer-events: none;"
                        >
                            {d.value.toLocaleString()}
                        </text>
                    {/if}
                    <!-- X Axis Labels -->
                    <text
                        x={(x(d.year.toString()) || 0) + x.bandwidth() / 2}
                        y={height - 5}
                        text-anchor="middle"
                        class="fill-slate-300 text-[10px] font-mono font-bold"
                    >
                        {d.year}
                    </text>
                {/each}
                <!-- Year 2020 Annotation -->
                <line
                    x1={x("2020") || 0}
                    x2={x("2020") || 0}
                    y1={padding.top}
                    y2={height - padding.bottom}
                    stroke="var(--color-amber-alert)"
                    stroke-width="2"
                    stroke-dasharray="4,4"
                    class="opacity-50"
                />
                <text
                    x={(x("2020") || 0) + 5}
                    y={padding.top + 10}
                    class="fill-amber-alert text-[9px] font-mono font-bold uppercase"
                >
                    Inicio REDENOR
                </text>
                <!-- Y Axis Label -->
                <text
                    transform="rotate(-90)"
                    x={-height / 2}
                    y={12}
                    text-anchor="middle"
                    class="fill-slate-500 text-[9px] font-mono tracking-widest uppercase"
                >
                    Total Clientes Afectados
                </text>
            </svg>

            <!-- Custom Tooltip -->
            {#if hoveredData}
                <div
                    class="absolute top-4 right-4 bg-black/90 border border-electric-cyan/30 p-3 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-xl pointer-events-none"
                >
                    <div
                        class="text-slate-400 text-[10px] font-mono uppercase mb-1"
                    >
                        Cierre Anillo {hoveredData.year}
                    </div>
                    <div
                        class="text-electric-cyan font-mono text-xl font-black"
                    >
                        {hoveredData.value.toLocaleString()}
                        <span class="text-[10px] text-white/50 font-normal ml-1"
                            >hogares</span
                        >
                    </div>
                </div>
            {/if}
        {:else}
            <div
                class="h-full flex flex-col items-center justify-center text-slate-400 text-xs italic font-mono space-y-2"
            >
                <div
                    class="w-8 h-8 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Mapeando éxito (ARICA)...</span>
            </div>
        {/if}
    </div>
</div>
