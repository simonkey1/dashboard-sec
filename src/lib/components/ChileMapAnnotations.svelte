<script lang="ts">
    import ChileMapSvg from "$lib/components/ChileMapSvg.svelte";
    import { ExternalLink } from "lucide-svelte";

    type FailurePoint = {
        id: string;
        label: string;
        desc: string;
        color: string;
        mapColor: string;
    };

    // Fixed failure points with map IDs
    const failurePoints: FailurePoint[] = [
        {
            id: "CL-AP",
            label: "Arica",
            desc: "REDENOR: Cierre de anillo técnico redujo fallas en 90%.",
            color: "text-electric-cyan",
            mapColor: "cyan",
        },
        {
            id: "CL-AN",
            label: "Antofagasta",
            desc: "Desierto: Alta radiación y problemas de aislación por polvo.",
            color: "text-amber-alert",
            mapColor: "amber",
        },
        {
            id: "CL-CO",
            label: "Coquimbo",
            desc: "Paradoja: Obra 500kV no redujo fallas locales por 3 años (Lag).",
            color: "text-neon-red",
            mapColor: "red",
        },
        {
            id: "CL-RM",
            label: "RM",
            desc: "Nevazón 2017 / Viento 2024: Fragilidad urbana extrema.",
            color: "text-neon-red",
            mapColor: "red",
        },
        {
            id: "CL-LL",
            label: "Los Lagos",
            desc: "Bosque: Fricción constante con monocultivo forestal.",
            color: "text-rose-500",
            mapColor: "rose",
        },
    ];

    let activeRegion = $state<string | null>(null);

    function setActive(id: string | null) {
        // Simple debounce or just direct set
        activeRegion = id;
    }
</script>

<div
    class="flex flex-col md:flex-row h-auto md:h-full gap-8 md:gap-16 items-center justify-center p-4"
>
    <!-- Interactive Map -->
    <!-- Interactive Map with Ovoid Container -->
    <div
        class="w-full h-[400px] md:h-full md:w-1/2 relative flex items-center justify-center shrink-0"
    >
        <!-- Ovoid Shape Container -->
        <div
            class="relative h-full aspect-1/3 md:aspect-1/3 rounded-full flex items-center justify-center py-8 md:py-12"
        >
            <ChileMapSvg
                {activeRegion}
                onSelect={(id: string) =>
                    (activeRegion = id === activeRegion ? null : id)}
            />

            <!-- Schematic Gradient Overlay (optional, behind content if z-index managed, or pointer-events-none on top) -->
            <div
                class="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none rounded-full overflow-hidden"
            ></div>
        </div>
    </div>

    <!-- Scrollable Timeline / List -->
    <div class="flex flex-col gap-6 w-full md:w-1/2 max-w-sm shrink-0">
        <a href="/research#cicatrices" class="group block cursor-pointer">
            <h3
                class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-hover:text-electric-cyan transition-all flex items-center gap-2 border-b border-transparent group-hover:border-electric-cyan/30 w-fit pb-1"
            >
                Cicatrices del Sistema (2017-2025)
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity"
                />
            </h3>
        </a>

        <div
            class="relative space-y-4 before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-800 before:to-transparent"
        >
            {#each failurePoints as point}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div
                    role="listitem"
                    class="group relative pl-8 cursor-default transition-all duration-300"
                    onmouseenter={() => setActive(point.id)}
                    onmouseleave={() => setActive(null)}
                >
                    <!-- Connecting Line/Dot -->
                    <div
                        class="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-slate-700 bg-slate-900 group-hover:bg-white group-hover:border-white transition-colors z-10
                        {activeRegion === point.id
                            ? 'bg-white border-white scale-125 shadow-[0_0_10px_white]'
                            : ''}"
                    ></div>

                    <div
                        class="p-4 rounded-xl border border-white/5 bg-white/5 group-hover:bg-white/5 transition-all
                        {activeRegion === point.id
                            ? 'bg-white/5 border-white/20 translate-x-1'
                            : ''}"
                    >
                        <div class="flex items-center gap-2 mb-1">
                            <span
                                class="w-1.5 h-1.5 rounded-full {point.color.replace(
                                    'text-',
                                    'bg-',
                                )}"
                            ></span>
                            <span
                                class="text-xs font-black uppercase tracking-widest text-white"
                            >
                                {point.label}
                            </span>
                        </div>
                        <p
                            class="text-xs text-slate-400 font-mono leading-relaxed"
                        >
                            {point.desc}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
