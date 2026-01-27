<script lang="ts">
    import type { InvestmentROIData } from "$lib/types";
    import { Chart, Svg, Axis, Bar, Tooltip } from "layerchart";
    import { scaleBand, scaleLinear } from "d3-scale";

    let { data = [] }: { data: InvestmentROIData[] } = $props();

    // Sort by descendants
    const chartData = $derived(
        JSON.parse(JSON.stringify(data))
            .sort((a: any, b: any) => b.efficiency_ratio - a.efficiency_ratio)
            .slice(0, 8),
    );
</script>

<div class="space-y-4 h-full flex flex-col">
    <div class="flex items-center justify-between">
        <a href="/metodologia#roi-social" class="group block">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-amber-alert transition-colors flex items-center gap-2"
            >
                Muro de Ineficiencia (Social ROI)
                <span
                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                    >→</span
                >
            </h2>
        </a>
        <span
            class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
            >Clientes / M$ USD</span
        >
    </div>

    <div
        class="flex-1 min-h-[300px] rounded-xl border border-slate-800 bg-slate-900/10 p-4"
    >
        {#if chartData.length > 0}
            <!-- Fixed manual horizontal bar chart for ROI -->
            {@const maxRatio = Math.max(
                ...chartData.map((d: any) => d.efficiency_ratio || 0),
            )}
            <div class="flex flex-col gap-3 h-full overflow-y-auto pr-2">
                {#each chartData as d}
                    <div class="flex items-center gap-4 group">
                        <div
                            class="w-24 text-[10px] font-bold text-slate-300 text-right uppercase tracking-tighter"
                        >
                            {d.nombre_region}
                        </div>
                        <div
                            class="flex-1 h-6 bg-white/5 rounded-sm relative overflow-visible"
                        >
                            <div
                                class="h-full bg-electric-cyan opacity-60 group-hover:opacity-100 transition-all duration-500 rounded-sm relative"
                                style="width: {(d.efficiency_ratio / maxRatio) *
                                    100}%"
                            >
                                <span
                                    class="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {d.efficiency_ratio.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div
                class="h-full flex items-center justify-center text-slate-600 text-xs italic"
            >
                Calculando ROI Social...
            </div>
        {/if}
    </div>
</div>
