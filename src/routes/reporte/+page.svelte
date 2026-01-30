<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import EnergyProjectsDist from "$lib/components/EnergyProjectsDist.svelte";
    import MermaidDiagram from "$lib/components/MermaidDiagram.svelte";

    import { language } from "$lib/stores/language";

    let { data } = $props();
    const stats = $derived(data.stats ?? {});

    // Select content based on language store
    const fullContent = $derived(
        $language === "en"
            ? data.reportContentEn || ""
            : data.reportContentEs || "",
    );

    // Process markdown for custom syntax before splitting
    function processMarkdown(text: string) {
        if (!text) return "";
        let processed = text;

        // Fix GitHub Alerts
        const alertMap: Record<string, string> = {
            TIP: "bg-emerald-500/10 border-emerald-500 text-emerald-400",
            NOTE: "bg-blue-500/10 border-blue-500 text-blue-400",
            IMPORTANT: "bg-violet-500/10 border-violet-500 text-violet-400",
            WARNING: "bg-amber-500/10 border-amber-500 text-amber-400",
            CAUTION: "bg-rose-500/10 border-rose-500 text-rose-400",
        };

        const iconMap: Record<string, string> = {
            TIP: "💡 TIP",
            NOTE: "📝 NOTE",
            IMPORTANT: "ℹ️ IMPORTANT",
            WARNING: "⚠️ WARNING",
            CAUTION: "🛑 CAUTION",
        };

        processed = processed.replace(
            /(?:^|\n)>\s*\[!(.*?)\]\s*[\r\n]+>\s*(.*?)(?=\n\s*\n|$)/gs,
            (match, type, content) => {
                const upperType = type.trim().toUpperCase();
                const style = alertMap[upperType] || alertMap["NOTE"];
                const label = iconMap[upperType] || iconMap["NOTE"];

                // Process inner markdown emphasis
                const formatted = content
                    .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-white">$1</strong>',
                    )
                    .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
                    .replace(
                        /\[(.*?)\]\((.*?)\)/g,
                        '<a href="$2" target="_blank" class="text-emerald-400 hover:underline hover:text-emerald-300 transition-colors">$1</a>',
                    );

                return `<div class="${style} border-l-4 p-4 my-6 rounded-r-lg"><strong class="block mb-1 font-bold">${label}</strong><div class="text-slate-300">${formatted}</div></div>`;
            },
        );

        return processed;
    }

    // Split content sections
    // 1. Mermaid Diagram (```mermaid ... ```)
    // 2. Project Distribution (Figures placeholder)
    const sections = $derived(() => {
        // First split by Mermaid
        const mermaidSplit = fullContent.split(/```mermaid([\s\S]*?)```/);
        // mermaidSplit[0] = Intro
        // mermaidSplit[1] = Mermaid Code
        // mermaidSplit[2] = Content after Mermaid

        if (mermaidSplit.length < 3)
            return [{ type: "text", content: fullContent }];

        const preMermaid = mermaidSplit[0];
        const mermaidCode = mermaidSplit[1];
        const postMermaidRaw = mermaidSplit[2];

        // Now split post-mermaid content by Project Distribution Figure
        // Pattern: ![Distribución Proyectos](figures/eda_projects_dist.png) OR ![Project Distribution](/eda_projects_dist.png)
        // We match broadly on the filename to be safe
        const projectVisSplit = postMermaidRaw.split(
            /!\[.*\]\(.*eda_projects_dist\.png\)/,
        );

        const finalSections = [
            { type: "text", content: preMermaid },
            { type: "mermaid", content: mermaidCode },
        ];

        if (projectVisSplit.length > 1) {
            finalSections.push({ type: "text", content: projectVisSplit[0] });
            finalSections.push({ type: "projects_dist", content: "" });
            finalSections.push({ type: "text", content: projectVisSplit[1] });
        } else {
            finalSections.push({ type: "text", content: postMermaidRaw });
        }

        return finalSections;
    });
</script>

<div
    class="max-w-4xl mx-auto prose prose-invert prose-emerald p-8 glass rounded-3xl border border-slate-800 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
>
    {#if fullContent}
        {#each sections() as section}
            {#if section.type === "text"}
                <SvelteMarkdown source={processMarkdown(section.content)} />
            {:else if section.type === "mermaid"}
                <MermaidDiagram source={section.content} />
            {:else if section.type === "projects_dist"}
                <div
                    class="not-prose my-12 p-6 bg-black/40 rounded-2xl border border-white/5"
                >
                    <EnergyProjectsDist
                        data={stats["eda_projects_dist"] || []}
                    />
                </div>
            {/if}
        {/each}
    {:else}
        <div class="text-center p-12 italic text-slate-500">
            Cargando reporte técnico...
        </div>
    {/if}
</div>
