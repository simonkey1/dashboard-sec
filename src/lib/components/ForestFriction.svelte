<script lang="ts">
    import { cn } from "$lib/utils";
    import { ExternalLink } from "lucide-svelte";
    import type { CompanyRankingData } from "$lib/types";
    import { language, t } from "$lib/stores/language";

    let { data = [] }: { data: CompanyRankingData[] } = $props();

    const southernCompanies = [
        "SAESA",
        "FRONTEL",
        "CGE",
        "CGE SUR",
        "EDELAYSEN",
        "COOPELAN",
        "LUZLINARES",
        "COPELEC",
        "CRELL",
    ];
    const items = $derived(
        JSON.parse(JSON.stringify(data)).sort(
            (a: any, b: any) =>
                (b.total_clientes_afectados ?? 0) -
                (a.total_clientes_afectados ?? 0),
        ),
    );
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <a href="/research#muro-verde" class="group block cursor-pointer">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-white group-hover:text-emerald-400 transition-all block border-b border-transparent group-hover:border-emerald-400/30 w-fit pb-1"
            >
                {t($language, "chart.friction.title")}
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity inline-block ml-1 align-baseline"
                />
            </h2>
        </a>
        <p class="text-[10px] text-slate-200 font-mono mt-1 hidden md:block">
            {t($language, "chart.friction.desc")}
        </p>
        <div class="flex items-center gap-3">
            <!-- Legend Green -->
            <div class="flex items-center gap-1 group relative">
                <div class="w-2 h-2 bg-emerald-500 rounded-sm"></div>
                <span
                    class="text-[9px] text-emerald-500 font-bold uppercase cursor-help border-b border-dashed border-emerald-500/30"
                    >Sur</span
                >
                <div
                    class="absolute right-0 top-4 w-32 bg-slate-900 border border-slate-700 p-2 rounded-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto shadow-xl"
                >
                    <p class="text-[9px] text-slate-300">
                        {t($language, "chart.friction.legend.green")}
                    </p>
                </div>
            </div>
            <!-- Legend Gray -->
            <div class="flex items-center gap-1 group relative">
                <div class="w-2 h-2 bg-white/40 rounded-sm"></div>
                <span
                    class="text-[9px] text-white font-bold uppercase cursor-help border-b border-dashed border-white/30"
                    >Otros</span
                >
                <div
                    class="absolute right-0 top-4 w-32 bg-slate-900 border border-slate-700 p-2 rounded-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto shadow-xl"
                >
                    <p class="text-[9px] text-slate-300">
                        {t($language, "chart.friction.legend.gray")}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div class="grid grid-cols-1 gap-2">
            {#each items as company, i}
                {@const isSouthern = southernCompanies.some((s) =>
                    company.nombre_empresa.toUpperCase().includes(s),
                )}
                <div
                    class="flex items-center gap-3 p-2 rounded border border-white/5 bg-rich-black group hover:border-white/10 transition-colors"
                >
                    <div class="text-[10px] font-mono text-white w-4">
                        #{i + 1}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class={cn(
                                    "text-xs font-bold uppercase tracking-tight",
                                    isSouthern
                                        ? "text-emerald-400"
                                        : "text-white",
                                )}
                            >
                                {company.nombre_empresa}
                            </span>
                            <span
                                class="text-[10px] font-mono text-white font-bold opacity-100"
                            >
                                {(
                                    company.total_clientes_afectados ?? 0
                                ).toLocaleString()}
                            </span>
                        </div>
                        <div
                            class="h-2 w-full bg-white/10 rounded-full overflow-hidden"
                        >
                            <div
                                class={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    isSouthern
                                        ? "bg-emerald-500"
                                        : "bg-white/40",
                                )}
                                style="width: {Math.min(
                                    100,
                                    (company.total_clientes_afectados /
                                        (items[0].total_clientes_afectados ||
                                            1)) *
                                        100,
                                )}%"
                            ></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <p class="text-[9px] text-slate-300 italic">
        {t($language, "chart.friction.note")}
    </p>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(52, 211, 153, 0.2);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(52, 211, 153, 0.4);
    }
</style>
