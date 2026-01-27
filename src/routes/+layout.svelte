<script lang="ts">
	import "./layout.css";
	import { page } from "$app/stores";
	let { children } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<svelte:head>
	<title>Estado de la Red | SEC Chile</title>
	<meta
		name="description"
		content="Monitor de fragilidad eléctrica e impacto de inversión en Chile (2017-2025)"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="dark min-h-dvh bg-slate-950 text-slate-300 font-sans flex flex-col">
	<header
		class="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 transition-all duration-300"
	>
		<div
			class="container mx-auto px-4 h-16 flex items-center justify-between"
		>
			<div class="flex items-center gap-2">
				<div
					class="w-2 h-8 bg-rose-500 rounded-full animate-pulse"
				></div>
				<h1 class="text-xl font-bold tracking-tighter text-white">
					ESTADO DE <span class="text-rose-500">LA RED</span>
				</h1>
			</div>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-6">
				<nav class="flex gap-6 text-sm font-medium">
					<a
						href="/"
						class="transition-colors {$page.url.pathname === '/'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}">Dashboard</a
					>
					<a
						href="/metodologia"
						class="transition-colors {$page.url.pathname ===
						'/metodologia'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}">Investigación</a
					>
					<a
						href="/reporte"
						class="transition-colors {$page.url.pathname ===
						'/reporte'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}">Reporte Técnico</a
					>
				</nav>
				<div class="h-4 w-px bg-slate-800"></div>
				<a
					href="https://github.com/simonkey1/SEC"
					target="_blank"
					class="text-slate-400 hover:text-white transition-colors"
					aria-label="GitHub Repository"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
					>
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-slate-300 hover:text-emerald-400 focus:outline-none"
				onclick={toggleMenu}
				aria-label="Toggle Menu"
			>
				<svg
					class="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{#if isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Dropdown -->
		{#if isMenuOpen}
			<div
				class="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 absolute w-full left-0 top-16 shadow-2xl animate-in slide-in-from-top-2 z-60"
			>
				<nav class="flex flex-col p-6 space-y-6 text-center">
					<a
						href="/"
						onclick={closeMenu}
						class="py-2 text-xl {$page.url.pathname === '/'
							? 'text-emerald-400 font-bold'
							: 'text-slate-300'}">Dashboard</a
					>
					<a
						href="/metodologia"
						onclick={closeMenu}
						class="py-2 text-xl {$page.url.pathname ===
						'/metodologia'
							? 'text-emerald-400 font-bold'
							: 'text-slate-300'}">Investigación</a
					>
					<a
						href="/reporte"
						onclick={closeMenu}
						class="py-2 text-xl {$page.url.pathname === '/reporte'
							? 'text-emerald-400 font-bold'
							: 'text-slate-300'}">Reporte Técnico</a
					>
					<div class="h-px w-full bg-slate-800 my-2"></div>
					<a
						href="https://github.com/simonkey1/SEC"
						target="_blank"
						onclick={closeMenu}
						class="py-4 text-lg text-white font-bold flex items-center justify-center gap-3 bg-white/5 rounded-xl border border-white/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
						>
						Ver Repositorio
					</a>
				</nav>
			</div>
		{/if}
	</header>

	<main class="container mx-auto px-4 py-8 flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-slate-800 py-12 pb-32 bg-slate-950">
		<div class="container mx-auto px-4 text-center">
			<p class="text-xs text-slate-500 uppercase tracking-widest">
				Proyecto de Datos SEC Chile • 2017-2025 • Infraestructura
				Crítica
			</p>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		background-color: #020617; /* slate-950 */
	}
</style>
