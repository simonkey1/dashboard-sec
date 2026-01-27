<script lang="ts">
    import type { InvestmentValidationData } from "$lib/types";
    import { TrendingDown, TrendingUp, Info } from "lucide-svelte";

    let { data = [] }: { data: InvestmentValidationData[] } = $props();
    const items = $derived(data);
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500">
            Evidencia de Inversión
        </h2>
        <span
            class="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20"
            >Antes vs Después</span
        >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each items as item}
            <div
                class="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3 relative overflow-hidden group"
            >
                <div
                    class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"
                >
                    <Info size={48} />
                </div>

                <div>
                    <h3 class="font-bold text-white text-sm">{item.project}</h3>
                    <p class="text-[10px] text-slate-500 uppercase">
                        {item.context}
                    </p>
                </div>

                <div class="flex items-end justify-between">
                    <div class="space-y-1">
                        <div class="text-[10px] text-slate-500 uppercase">
                            Impacto
                        </div>
                        <div
                            class="flex items-center gap-1 font-bold {(
                                item.delta?.toString() || ''
                            ).startsWith('-')
                                ? 'text-emerald-400'
                                : 'text-slate-400'}"
                        >
                            {#if (item.delta?.toString() || "").startsWith("-")}
                                <TrendingDown size={14} />
                            {:else}
                                <TrendingUp size={14} />
                            {/if}
                            {item.delta}
                        </div>
                    </div>

                    <div class="text-right">
                        <div
                            class="text-[24px] font-black tracking-tighter text-slate-700 leading-none"
                        >
                            {item.year}
                        </div>
                        <div class="text-[10px] text-slate-600 uppercase">
                            Año Proyecto
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
