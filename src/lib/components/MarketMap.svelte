<script lang="ts">
    import type { MarketMapData } from "$lib/types";
    import { cn } from "$lib/utils";

    let { data = [] }: { data: MarketMapData[] } = $props();

    // Grouping by "Comuna" or region if provided.
    // Here we'll show the Top 12 most unstable regions/comunas as stylized tiles.
    const sortedData = $derived(
        [...data]
            .sort((a, b) => b.instability_index - a.instability_index)
            .slice(0, 12),
    );

    function getHeatColor(index: number) {
        if (index > 80) return "bg-rose-500 text-rose-950";
        if (index > 60) return "bg-rose-600/80 text-rose-50";
        if (index > 40) return "bg-rose-800/60 text-rose-100";
        if (index > 20) return "bg-slate-800 text-slate-400";
        return "bg-slate-900 text-slate-600";
    }
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500">
            Mapa de Calor: La Cicatriz
        </h2>
        <span
            class="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded border border-rose-500/20"
            >Zonas Críticas</span
        >
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {#each sortedData as item}
            <div
                class={cn(
                    "p-3 rounded-lg flex flex-col justify-between h-24 border border-white/5 transition-all hover:scale-[1.02]",
                    getHeatColor(item.instability_index),
                )}
            >
                <div class="text-[10px] font-bold uppercase truncate">
                    {item.comuna}
                </div>
                <div class="flex items-end justify-between">
                    <span class="text-2xl font-black"
                        >{item.instability_index}</span
                    >
                    <span class="text-[8px] uppercase opacity-60">Index</span>
                </div>
            </div>
        {/each}
    </div>

    <div
        class="flex items-center justify-between text-[9px] text-slate-600 uppercase tracking-tighter pt-2"
    >
        <span>Estabilidad</span>
        <div
            class="flex-1 mx-4 h-1 bg-gradient-to-r from-slate-800 via-rose-800 to-rose-500 rounded-full"
        ></div>
        <span>Fragilidad</span>
    </div>
</div>
