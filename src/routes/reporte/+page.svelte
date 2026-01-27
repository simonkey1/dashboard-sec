<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    let { data } = $props();
    const content = $derived(data.reportContent || "");
</script>

<div
    class="max-w-4xl mx-auto prose prose-invert prose-emerald p-8 glass rounded-3xl border border-slate-800 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
>
    <SvelteMarkdown source={content} />
</div>
