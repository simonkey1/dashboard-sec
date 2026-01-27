<script lang="ts">
    import { cn } from "$lib/utils";
    import { ExternalLink } from "lucide-svelte";
    import type { CompanyRankingData } from "$lib/types";

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
        <a href="/metodologia#muro-verde" class="group block">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
                Fricción Forestal: Impacto en Redes del Sur
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity"
                />
            </h2>
        </a>
        <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-[#2d5a27]"></div>
            <span class="text-[9px] text-slate-500 font-bold uppercase"
                >Clientes Afectados (Acumulado)</span
            >
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
                    <div class="text-[10px] font-mono text-slate-600 w-4">
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

    <p class="text-[9px] text-slate-600 italic">
        * En el sur, la caída de árboles sobre líneas anula la inversión
        macro-técnica.
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
