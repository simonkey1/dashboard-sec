<script lang="ts">
    import PulseMonitor from "$lib/components/PulseMonitor.svelte";
    import ChileMapAnnotations from "$lib/components/ChileMapAnnotations.svelte";
    import InefficiencyWall from "$lib/components/InefficiencyWall.svelte";
    import ForestFriction from "$lib/components/ForestFriction.svelte";
    import CoquimboParadox from "$lib/components/CoquimboParadox.svelte";
    import AricaSurgery from "$lib/components/AricaSurgery.svelte";

    let { data } = $props();
    const stats = $derived(data.stats ?? {});
</script>

<div class="space-y-8 animate-in fade-in duration-1000">
    <!-- Hero Section -->
    <section class="max-w-3xl">
        <h2
            class="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4"
        >
            LA FRAGILIDAD DEL <span class="text-rose-500">SISTEMA</span>
        </h2>
        <p class="text-slate-400 text-lg md:text-xl leading-relaxed">
            Análisis sociotécnico de 6.2 millones de registros de interrupciones
            eléctricas en Chile. Una red que invierte billones pero que aún no
            logra la resiliencia climática.
        </p>
    </section>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <!-- Main Time Series (Full Width) -->
        <div
            class="md:col-span-12 lg:col-span-12 p-6 glass rounded-2xl border border-white/5 overflow-hidden"
        >
            <PulseMonitor data={stats["time_series"] || []} />
        </div>

        <!-- Second Row: Coquimbo and Social ROI -->
        <div
            class="md:col-span-12 lg:col-span-6 p-6 glass rounded-2xl border border-white/5"
        >
            <CoquimboParadox
                data={stats["time_series"]?.filter((d: any) =>
                    (d.nombre_region || d.region)?.includes("COQUIMBO"),
                ) || []}
            />
        </div>

        <div
            class="md:col-span-12 lg:col-span-6 p-6 glass rounded-2xl border border-white/5"
        >
            <InefficiencyWall data={stats["investment_roi"] || []} />
        </div>

        <!-- Third Row: Arica Surgery (Full Width for clarity) -->
        <div class="md:col-span-12 p-6 glass rounded-2xl border border-white/5">
            <AricaSurgery
                data={stats["time_series"]?.filter(
                    (d: any) =>
                        d.nombre_region?.includes("ARICA") ||
                        d.region?.includes("ARICA"),
                ) || []}
            />
        </div>

        <!-- Fourth Row: Cicatrices (Map) -->
        <div
            class="md:col-span-12 p-6 glass rounded-2xl border border-white/5 h-auto md:h-[600px]"
        >
            <ChileMapAnnotations />
        </div>

        <!-- Fifth Row: Forest Friction (Full Width with inner scroll) -->
        <div class="md:col-span-12 p-6 glass rounded-2xl border border-white/5">
            <ForestFriction data={stats["company_ranking"] || []} />
        </div>
    </div>

    <!-- CTAs -->
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6">
        <a
            href="/research"
            class="group w-full p-8 border border-slate-800 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
        >
            <div
                class="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2"
            >
                Proyecto de Investigación
            </div>
            <div class="text-2xl font-bold text-white mb-2">
                Manifesto del Dato
            </div>
            <p class="text-slate-500 text-sm">
                Explora la metodología "Descripción Densa" y por qué los
                indicadores oficiales fallan al usuario.
            </p>
        </a>
        <a
            href="/reporte"
            class="group w-full p-8 border border-slate-800 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
        >
            <div
                class="text-rose-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
                Ingeniería de Datos
            </div>
            <div class="text-2xl font-bold text-white mb-2">
                Arquitectura Medallion
            </div>
            <p class="text-slate-500 text-sm">
                Debajo del capó: Scrapers asíncronos, PostgreSQL y el pipeline
                de sincronización de Supabase.
            </p>
        </a>
    </div>
</div>

<style>
    .glass {
        background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.9) 0%,
            rgba(15, 23, 42, 0.8) 100%
        );
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
</style>
