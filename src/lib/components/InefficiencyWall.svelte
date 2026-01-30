<script lang="ts">
    import { ExternalLink } from "lucide-svelte";
    import type { InvestmentRoiData } from "$lib/types";

    import { language, t } from "$lib/stores/language";

    let { data = [] }: { data: InvestmentRoiData[] } = $props();

    // Sort by descendants
    const chartData = $derived(
        JSON.parse(JSON.stringify(data))
            .sort((a: any, b: any) => b.efficiency_ratio - a.efficiency_ratio)
            .slice(0, 8),
    );
</script>

<div class="space-y-4 h-full flex flex-col">
    <div class="flex items-center justify-between">
        <a href="/research#roi-social" class="group block cursor-pointer">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-white group-hover:text-amber-alert transition-all block border-b border-transparent group-hover:border-amber-alert/30 w-fit pb-1"
            >
                {t($language, "chart.roi.title")}
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity inline-block ml-1 align-baseline"
                />
            </h2>
        </a>
        <p class="text-[10px] text-slate-200 font-mono mt-1 hidden md:block">
            {t($language, "chart.roi.desc")}
        </p>
        <div class="flex flex-col items-end">
            <span
                class="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded cursor-help"
                title={t($language, "chart.roi.desc")}
                >{t($language, "chart.roi.unit")}</span
            >
        </div>
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
                            class="w-24 text-[10px] font-bold text-white text-right uppercase tracking-tighter"
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
                            ></div>
                            <span
                                class="absolute top-1/2 -translate-y-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                                style="
                                    left: {(d.efficiency_ratio / maxRatio) *
                                    100 >
                                20
                                    ? 'auto'
                                    : 'calc(' +
                                      (d.efficiency_ratio / maxRatio) * 100 +
                                      '% + 8px)'};
                                    right: {(d.efficiency_ratio / maxRatio) *
                                    100 >
                                20
                                    ? '8px'
                                    : 'auto'};
                                    color: {(d.efficiency_ratio / maxRatio) *
                                    100 >
                                20
                                    ? '#000'
                                    : '#cbd5e1'};
                                "
                            >
                                {d.efficiency_ratio.toFixed(1)}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div
                class="h-full flex items-center justify-center text-slate-600 text-xs italic"
            >
                {t($language, "common.loading")}
            </div>
        {/if}
    </div>
</div>
