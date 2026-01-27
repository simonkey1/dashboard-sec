<script lang="ts">
    import {
        ExternalLink,
        AlertTriangle,
        Zap,
        Activity,
        TreePine,
    } from "lucide-svelte";

    type FailurePoint = {
        id: string;
        label: string;
        desc: string;
        color: string;
        icon: any; // Lucide icon
        stats: string;
    };

    // Fixed failure points with map IDs
    const failurePoints: FailurePoint[] = [
        {
            id: "CL-AP",
            label: "Arica",
            desc: "REDENOR: Cierre de anillo técnico redujo fallas dramáticamente.",
            color: "text-electric-cyan",
            icon: Zap,
            stats: "-90% Fallas",
        },
        {
            id: "CL-AN",
            label: "Antofagasta",
            desc: "Desierto: Alta radiación y problemas de aislación por contaminación salina.",
            color: "text-amber-alert",
            icon: Activity,
            stats: "Riesgo Ambiental",
        },
        {
            id: "CL-CO",
            label: "Coquimbo",
            desc: "Paradoja: Obra 500kV no impactó la calidad local por 3 años.",
            color: "text-neon-red",
            icon: AlertTriangle,
            stats: "Lag de Inversión",
        },
        {
            id: "CL-RM",
            label: "Metropolitana",
            desc: "Nevazón 2017 y Viento 2024 exponen la fragilidad del tendido aéreo.",
            color: "text-neon-red",
            icon: AlertTriangle,
            stats: "Falla Crítica",
        },
        {
            id: "CL-LL",
            label: "Los Lagos",
            desc: "Fricción constante entre tendido eléctrico y monocultivo forestal.",
            color: "text-rose-500",
            icon: TreePine,
            stats: "Interferencia",
        },
    ];
</script>

<div class="flex flex-col h-full gap-8 p-4">
    <div class="flex items-center justify-between border-b border-white/5 pb-4">
        <a href="/research#cicatrices" class="group block cursor-pointer">
            <h3
                class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-electric-cyan transition-all block w-fit"
            >
                Cicatrices del Sistema (2017-2025)
                <ExternalLink
                    size={10}
                    class="opacity-40 group-hover:opacity-100 transition-opacity inline-block ml-1 align-baseline"
                />
            </h3>
        </a>
        <span class="text-[10px] text-slate-600 font-mono uppercase"
            >Log de Eventos</span
        >
    </div>

    <!-- Responsive Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each failurePoints as point}
            <div
                class="group relative p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full"
            >
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <svelte:component
                            this={point.icon}
                            size={16}
                            class={point.color.replace("text-", "text-")}
                        />
                        <span
                            class="text-sm font-black uppercase tracking-widest text-white"
                        >
                            {point.label}
                        </span>
                    </div>
                    <span
                        class="text-[9px] font-mono py-1 px-2 rounded bg-black/30 text-slate-400 border border-white/5"
                    >
                        {point.stats}
                    </span>
                </div>

                <!-- Body -->
                <p
                    class="text-xs text-slate-400 font-mono leading-relaxed group-hover:text-slate-200 transition-colors"
                >
                    {point.desc}
                </p>

                <!-- Decoration -->
                <div
                    class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-{point.color.replace(
                        'text-',
                        '',
                    )}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
            </div>
        {/each}
    </div>
</div>
