<script lang="ts">
    import {
        Chart,
        Svg,
        Axis,
        Line,
        Area,
        Tooltip,
        Highlight,
    } from "layerchart";
    import { scaleTime, scaleLinear } from "d3-scale";
    import { curveMonotoneX } from "d3-shape";
    import { format } from "date-fns";
    import { es } from "date-fns/locale";
    import { ExternalLink } from "lucide-svelte";
    import type { TimeSeriesData } from "$lib/types";

    let { data = [] }: { data: TimeSeriesData[] } = $props();

    const chartData = $derived(
        JSON.parse(JSON.stringify(data)).map((d: any) => ({
            date: new Date(d.mes),
            value: d.afectados,
        })),
    );
</script>

<div class="space-y-4 h-full flex flex-col">
    <div class="flex items-center justify-between">
        <a href="/research#coquimbo" class="group block cursor-pointer">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-amber-alert transition-all flex items-center gap-2 border-b border-transparent group-hover:border-amber-alert/30 w-fit pb-1"
            >
                Coquimbo: Impacto Tardío (Lag)
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity"
                />
            </h2>
        </a>
        <div class="flex items-center gap-2 group relative">
            <span class="w-2 h-2 rounded-full bg-amber-alert"></span>
            <span
                class="text-[10px] text-amber-alert font-mono uppercase cursor-help border-b border-dashed border-amber-alert/50"
                >Cardones-Polpaico (?)</span
            >
            <!-- Interpretation Tooltip -->
            <div
                class="absolute right-0 top-6 w-64 bg-slate-900 border border-slate-700 p-3 rounded-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto shadow-xl"
            >
                <p class="text-[10px] text-slate-300 leading-relaxed">
                    <strong class="text-amber-alert">Debate:</strong> ¿Es "Lag" (tiempo
                    de adaptación normal) o "Ineficiencia Logística"? El gráfico
                    muestra que el impacto positivo tardó años en materializarse,
                    sugiriendo complejidad en la coordinación transmisión-distribución.
                </p>
            </div>
        </div>
    </div>

    <div
        class="flex-1 min-h-[250px] relative rounded-xl border border-white/5 bg-rich-black p-4"
    >
        {#if chartData.length > 0}
            <Chart
                data={chartData}
                x="date"
                xScale={scaleTime()}
                y="value"
                yScale={scaleLinear()}
                padding={{ top: 50, right: 10, bottom: 30, left: 50 }}
                let:width
                let:height
                let:padding
                let:yScale
            >
                <Svg {width} {height} {padding}>
                    <defs>
                        <linearGradient
                            id="amber-gradient"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stop-color="var(--color-amber-alert)"
                                stop-opacity="0.2"
                            />
                            <stop
                                offset="100%"
                                stop-color="var(--color-amber-alert)"
                                stop-opacity="0"
                            />
                        </linearGradient>
                    </defs>

                    <Axis
                        placement="left"
                        grid={{ class: "stroke-white/5" }}
                        ticks={5}
                        class="text-[10px] font-mono fill-white opacity-80"
                    />
                    <Axis
                        placement="bottom"
                        grid={{ class: "stroke-white/5" }}
                        ticks={5}
                        format={(d: Date) => format(d, "yyyy")}
                        class="text-[10px] font-mono fill-white opacity-80"
                    />

                    <!-- Yellow Overlay (2019-2020 Investment Period) -->
                    {@const startX =
                        ((new Date("2019-01-01").getTime() -
                            chartData[0].date.getTime()) /
                            (chartData[chartData.length - 1].date.getTime() -
                                chartData[0].date.getTime())) *
                        width}
                    {@const endX =
                        ((new Date("2020-12-31").getTime() -
                            chartData[0].date.getTime()) /
                            (chartData[chartData.length - 1].date.getTime() -
                                chartData[0].date.getTime())) *
                        width}

                    {#if startX < width && endX > 0}
                        <rect
                            x={startX}
                            y={0}
                            width={endX - startX}
                            {height}
                            class="fill-amber-alert/10"
                        />
                        <text
                            x={startX + (endX - startX) / 2}
                            y={15}
                            class="fill-amber-alert text-[7px] font-bold uppercase text-center"
                            text-anchor="middle"
                        >
                            Entrega Obra (Lag)
                        </text>
                    {/if}

                    <!-- Earthquake Annotation (Jan 2019) -->
                    {@const quakeX =
                        ((new Date("2019-01-19").getTime() -
                            chartData[0].date.getTime()) /
                            (chartData[chartData.length - 1].date.getTime() -
                                chartData[0].date.getTime())) *
                        width}

                    {#if quakeX > 0 && quakeX < width}
                        {@const peakY = yScale(123000)}
                        <line
                            x1={quakeX}
                            y1={peakY}
                            x2={quakeX}
                            y2={peakY - 35}
                            stroke="white"
                            stroke-width="1"
                        />
                        <text
                            x={quakeX}
                            y={peakY - 40}
                            class="fill-white text-[9px] font-bold uppercase text-center"
                            text-anchor="middle"
                        >
                            Sismo 6.7Mw
                        </text>
                        <circle
                            cx={quakeX}
                            cy={peakY}
                            r="3"
                            fill="white"
                            class="animate-pulse"
                        />
                    {/if}

                    <!-- Improvement Phase Marker (approx 2023 onwards based on user feedback) -->
                    {@const improvementX =
                        ((new Date("2023-01-01").getTime() -
                            chartData[0].date.getTime()) /
                            (chartData[chartData.length - 1].date.getTime() -
                                chartData[0].date.getTime())) *
                        width}

                    {#if improvementX > 0 && improvementX < width}
                        <line
                            x1={improvementX}
                            y1={0}
                            x2={improvementX}
                            y2={height}
                            stroke="var(--color-electric-cyan)"
                            stroke-width="1"
                            stroke-dasharray="4,4"
                            opacity="0.5"
                        />
                        <text
                            x={improvementX + 5}
                            y={15}
                            class="fill-electric-cyan text-[9px] font-black uppercase tracking-wider"
                        >
                            ¿Inicio Mejora?
                        </text>
                    {/if}

                    <Area
                        line={{
                            stroke: "var(--color-amber-alert)",
                            strokeWidth: 2,
                        }}
                        fill="url(#amber-gradient)"
                        curve={curveMonotoneX}
                    />
                    <Highlight
                        lines
                        points={{
                            fill: "var(--color-amber-alert)",
                            r: 4,
                            stroke: "white",
                        }}
                    />
                </Svg>
                <Tooltip.Root let:data>
                    <div
                        class="bg-black/90 border border-white/20 p-3 rounded-lg shadow-2xl backdrop-blur-xl z-100"
                    >
                        <div
                            class="text-slate-400 text-[9px] font-mono uppercase mb-1"
                        >
                            {format(data.date, "MMMM yyyy", { locale: es })}
                        </div>
                        <div class="text-white font-mono text-xl font-bold">
                            {(data.value ?? 0).toLocaleString()}
                            <span
                                class="text-[10px] font-normal text-amber-alert"
                                >hogares</span
                            >
                        </div>
                    </div>
                </Tooltip.Root>
            </Chart>
        {:else}
            <div
                class="h-full flex flex-col items-center justify-center text-slate-400 text-xs italic font-mono space-y-2"
            >
                <div
                    class="w-8 h-8 border-2 border-amber-alert border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Sincronizando Lag (COQUIMBO)...</span>
            </div>
        {/if}
    </div>
</div>
