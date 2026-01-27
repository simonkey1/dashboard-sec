<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let { source } = $props();
    let container: HTMLDivElement;
    let mermaidLoadError = $state(false);

    onMount(async () => {
        if (browser && source) {
            try {
                // Dynamically import mermaid from CDN to avoid heavy dependency
                const mergeImport = await import(
                    "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
                );
                const mermaid = mergeImport.default;

                mermaid.initialize({
                    startOnLoad: false,
                    theme: "dark",
                    themeVariables: {
                        darkMode: true,
                        primaryColor: "#0ea5e9", // Sky 500
                        primaryTextColor: "#fff",
                        primaryBorderColor: "#0284c7",
                        lineColor: "#94a3b8",
                        secondaryColor: "#1e293b",
                        tertiaryColor: "#0f172a",
                    },
                });

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, source);
                if (container) container.innerHTML = svg;
            } catch (e) {
                console.error("Mermaid load failed:", e);
                mermaidLoadError = true;
            }
        }
    });
</script>

<div
    class="my-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl overflow-x-auto flex justify-center"
    bind:this={container}
>
    {#if !container?.innerHTML}
        <div class="text-xs text-slate-500 font-mono animate-pulse">
            {mermaidLoadError
                ? "Error cargando diagrama"
                : "Renderizando arquitectura..."}
        </div>
    {/if}
</div>
