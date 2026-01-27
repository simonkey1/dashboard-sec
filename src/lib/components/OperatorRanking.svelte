<script lang="ts">
    import type { CompanyRankingData } from "$lib/types";
    import { cn } from "$lib/utils";

    let { data = [] }: { data: CompanyRankingData[] } = $props();
    const items = $derived(data);
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500">
            Ranking de la Vergüenza
        </h2>
        <span
            class="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded border border-rose-500/20"
            >Bad Actors</span
        >
    </div>

    <div
        class="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/30"
    >
        <table class="w-full text-left text-sm">
            <thead
                class="bg-slate-900/50 text-slate-400 text-[10px] uppercase font-bold"
            >
                <tr>
                    <th class="p-3">Empresa</th>
                    <th class="p-3 text-right">Afectados Total</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
                {#each items.slice(0, 5) as company, i}
                    <tr class="hover:bg-slate-800/30 transition-colors">
                        <td class="p-3 font-medium text-slate-200">
                            <span class="text-slate-600 mr-2">#{i + 1}</span>
                            {company.nombre_empresa}
                        </td>
                        <td class="p-3 text-right font-mono text-rose-400">
                            {(
                                company.total_clientes_afectados ?? 0
                            ).toLocaleString()}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
