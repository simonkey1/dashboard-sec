<script lang="ts">
    import { cn } from "$lib/utils";

    let { data = [] }: { data: any[] } = $props();

    // Sort by count descending
    const items = $derived(
        JSON.parse(JSON.stringify(data)).sort(
            (a: any, b: any) => (b.count ?? 0) - (a.count ?? 0),
        ),
    );

    const maxCount = $derived(items.length > 0 ? items[0].count : 1);
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2
            class="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 border-b border-transparent w-fit pb-1"
        >
            Distribución de Proyectos (SEIA)
        </h2>
        <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-blue-500"></div>
            <span class="text-[9px] text-slate-500 font-bold uppercase"
                >Frecuencia</span
            >
        </div>
    </div>

    <div class="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        <div class="grid grid-cols-1 gap-3">
            {#each items as item, i}
                <div class="relative flex items-center gap-3 p-2 rounded group">
                    <!-- Background Bar -->
                    <div
                        class="absolute left-0 top-0 bottom-0 bg-blue-500/10 rounded-r transition-all duration-1000 ease-out"
                        style="width: {(item.count / maxCount) * 100}%"
                    ></div>

                    <div class="text-[10px] font-mono text-slate-600 w-6 z-10">
                        #{i + 1}
                    </div>
                    <div class="flex-1 z-10">
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold uppercase tracking-tight text-slate-300 group-hover:text-white transition-colors"
                            >
                                {item.nombre_region}
                            </span>
                            <span
                                class="text-[10px] font-mono text-blue-400 font-bold"
                            >
                                {item.count}
                            </span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
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
        background: rgba(59, 130, 246, 0.2);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 130, 246, 0.4);
    }
</style>
