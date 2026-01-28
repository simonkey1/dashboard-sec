<script lang="ts">
    import PulseMonitor from "$lib/components/PulseMonitor.svelte";
    import ChileMapAnnotations from "$lib/components/ChileMapAnnotations.svelte";
    import InefficiencyWall from "$lib/components/InefficiencyWall.svelte";
    import ForestFriction from "$lib/components/ForestFriction.svelte";
    import CoquimboParadox from "$lib/components/CoquimboParadox.svelte";
    import AricaSurgery from "$lib/components/AricaSurgery.svelte";

    import { language, t } from "$lib/stores/language";

    let { data } = $props();
    const stats = $derived(data.stats ?? {});
</script>

<div class="space-y-8 animate-in fade-in duration-1000">
    <!-- Hero Section -->
    <section class="max-w-4xl">
        <div class="flex flex-wrap gap-2 mb-4">
            <span
                class="px-2 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded border border-amber-500/20 uppercase"
                >Data Pipeline: Python + Polars</span
            >
            <span
                class="px-2 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded border border-cyan-500/20 uppercase"
                >Database: PostgreSQL</span
            >
            <span
                class="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded border border-orange-500/20 uppercase"
                >Frontend: SvelteKit</span
            >
        </div>
        <h2
            class="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4"
        >
            {t($language, "hero.title.prefix")}
            <span class="text-rose-500"
                >{t($language, "hero.title.highlight")}</span
            >
        </h2>
        <p class="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            {t($language, "hero.subtitle")}
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
            class="md:col-span-12 p-6 glass rounded-2xl border border-white/5 h-auto"
        >
            <ChileMapAnnotations />
        </div>

        <!-- Fifth Row: Forest Friction (Full Width with inner scroll) -->
        <div class="md:col-span-12 p-6 glass rounded-2xl border border-white/5">
            <ForestFriction data={stats["company_ranking"] || []} />
        </div>
    </div>

    <!-- About / Architecture Section -->
    <div
        id="about"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 glass rounded-2xl border border-white/5 scroll-mt-24"
    >
        <div>
            <h3
                class="text-white font-bold text-xl mb-4 flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"
                    ></polyline></svg
                >
                {t($language, "about.insights")}
            </h3>
            <ul class="space-y-3">
                <li class="flex items-start gap-3">
                    <span
                        class="w-1.5 h-1.5 mt-2 bg-emerald-400 rounded-full shrink-0"
                    ></span>
                    <span class="text-slate-400 text-sm">
                        <strong class="text-slate-200"
                            >Raw SAIFI vs Official SAIFI:</strong
                        >
                        {t($language, "about.insight_1")}
                    </span>
                </li>
                <li class="flex items-start gap-3">
                    <span
                        class="w-1.5 h-1.5 mt-2 bg-emerald-400 rounded-full shrink-0"
                    ></span>
                    <span class="text-slate-400 text-sm">
                        <strong class="text-slate-200">Social ROI:</strong>
                        {t($language, "about.insight_2")}
                    </span>
                </li>
            </ul>
        </div>
        <div>
            <h3
                class="text-white font-bold text-xl mb-4 flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><polygon points="12 2 2 7 12 12 22 7 12 2"
                    ></polygon><polyline points="2 17 12 22 22 17"
                    ></polyline><polyline points="2 12 12 17 22 12"
                    ></polyline></svg
                >
                {t($language, "about.architecture")}
            </h3>
            <ul class="space-y-3">
                <li class="flex items-start gap-3">
                    <span
                        class="w-1.5 h-1.5 mt-2 bg-cyan-400 rounded-full shrink-0"
                    ></span>
                    <span class="text-slate-400 text-sm">
                        <strong class="text-slate-200"
                            >{t($language, "about.data_pipeline")}:</strong
                        >
                        {t($language, "about.pipeline_desc")}
                    </span>
                </li>
                <li class="flex items-start gap-3">
                    <span
                        class="w-1.5 h-1.5 mt-2 bg-cyan-400 rounded-full shrink-0"
                    ></span>
                    <span class="text-slate-400 text-sm">
                        <strong class="text-slate-200"
                            >{t($language, "about.database")}:</strong
                        >
                        {t($language, "about.db_desc")}
                    </span>
                </li>
            </ul>
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
                {t($language, "nav.research")}
            </div>
            <div class="text-2xl font-bold text-white mb-2">
                Manifesto del Dato
            </div>
            <p class="text-slate-500 text-sm">
                {t($language, "footer.research")}
            </p>
        </a>
        <a
            href="/reporte"
            class="group w-full p-8 border border-slate-800 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
        >
            <div
                class="text-rose-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
                {t($language, "nav.report")}
            </div>
            <div class="text-2xl font-bold text-white mb-2">
                Arquitectura Medallion
            </div>
            <p class="text-slate-500 text-sm">
                {t($language, "about.pipeline_desc")}
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
