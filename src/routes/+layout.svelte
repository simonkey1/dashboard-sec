<script lang="ts">
	import "./layout.css";
	import { page } from "$app/stores";
	import { language, t } from "$lib/stores/language";

	let { children } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function toggleLanguage() {
		language.toggle();
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

<div
	class="dark h-dvh overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-300 font-sans flex flex-col w-full relative scroll-smooth"
>
	<header
		class="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 left-0 w-full z-100 transition-all duration-300"
	>
		<div
			class="container mx-auto px-4 h-16 flex items-center justify-between"
		>
			<div class="flex items-center gap-2">
				<div
					class="w-2 h-8 bg-rose-500 rounded-full animate-pulse"
				></div>
				<h1 class="text-xl font-bold tracking-tighter text-white">
					{$language === "es" ? "ESTADO DE" : "STATE OF THE"}
					<span class="text-rose-500"
						>{$language === "es" ? "RED" : "GRID"}</span
					>
				</h1>
			</div>

			<!-- Language Toggle (Desktop) -->
			<button
				onclick={toggleLanguage}
				class="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 ml-4 transition-all"
			>
				<span
					class="text-xs font-bold {$language === 'es'
						? 'text-emerald-400'
						: 'text-slate-500'}">ES</span
				>
				<span
					class="text-xs font-bold {$language === 'en'
						? 'text-emerald-400'
						: 'text-slate-500'}">EN</span
				>
			</button>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-6">
				<nav class="flex gap-6 text-sm font-medium">
					<a
						href="/"
						class="transition-colors {$page.url.pathname === '/'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}"
						>{t($language, "nav.dashboard")}</a
					>
					<a
						href="/research"
						class="transition-colors {$page.url.pathname ===
						'/research'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}"
						>{t($language, "nav.research")}</a
					>
					<a
						href="/reporte"
						class="transition-colors {$page.url.pathname ===
						'/reporte'
							? 'text-emerald-400 font-bold'
							: 'hover:text-white'}"
						>{t($language, "nav.report")}</a
					>
					<a href="/#about" class="transition-colors hover:text-white"
						>{t($language, "footer.about")}</a
					>
				</nav>
				<div class="h-4 w-px bg-slate-800"></div>
				<div class="flex items-center gap-2">
					<a
						href="https://github.com/simonkey1/SEC"
						target="_blank"
						class="text-slate-400 hover:text-white transition-colors"
						aria-label={t($language, "nav.repo.etl")}
						title={t($language, "nav.repo.etl")}
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
					<a
						href="https://github.com/simonkey1/dashboard-sec"
						target="_blank"
						class="text-slate-400 hover:text-electric-cyan transition-colors"
						aria-label={t($language, "nav.repo.frontend")}
						title={t($language, "nav.repo.frontend")}
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
							><polyline points="16 18 22 12 16 6"
							></polyline><polyline points="8 6 2 12 8 18"
							></polyline></svg
						>
					</a>
				</div>
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
							: 'text-slate-300'}"
						>{t($language, "nav.dashboard")}</a
					>
					<button
						onclick={() => {
							toggleLanguage();
							closeMenu();
						}}
						class="py-2 text-xl text-slate-300 flex items-center justify-center gap-2"
					>
						<span
							>{$language === "es"
								? "🇪🇸 Español"
								: "🇺🇸 English"}</span
						>
					</button>
					<a
						href="/research"
						onclick={closeMenu}
						class="py-2 text-xl {$page.url.pathname === '/research'
							? 'text-emerald-400 font-bold'
							: 'text-slate-300'}"
						>{t($language, "nav.research")}</a
					>
					<a
						href="/reporte"
						onclick={closeMenu}
						class="py-2 text-xl {$page.url.pathname === '/reporte'
							? 'text-emerald-400 font-bold'
							: 'text-slate-300'}">{t($language, "nav.report")}</a
					>
					<a
						href="/#about"
						onclick={closeMenu}
						class="py-2 text-xl text-slate-300"
						>{t($language, "footer.about")}</a
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
						<span class="text-sm"
							>{t($language, "nav.repo.etl")}</span
						>
					</a>
					<a
						href="https://github.com/simonkey1/dashboard-sec"
						target="_blank"
						onclick={closeMenu}
						class="py-4 text-lg text-electric-cyan font-bold flex items-center justify-center gap-3 bg-electric-cyan/10 rounded-xl border border-electric-cyan/20"
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
							><polyline points="16 18 22 12 16 6"
							></polyline><polyline points="8 6 2 12 8 18"
							></polyline></svg
						>
						<span class="text-sm"
							>{t($language, "nav.repo.frontend")}</span
						>
					</a>
				</nav>
			</div>
		{/if}
	</header>

	<main class="container mx-auto px-4 py-8 flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-slate-800 py-12 pb-32 bg-slate-950">
		<div
			class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8"
		>
			<!-- Col 1: Brand & Desc -->
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center gap-2 mb-4">
					<div class="w-2 h-6 bg-rose-500 rounded-full"></div>
					<h3 class="font-bold text-white tracking-tighter">
						SEC DATA INTELLIGENCE
					</h3>
				</div>
				<p class="text-slate-500 text-sm leading-relaxed max-w-md">
					{t($language, "footer.desc")}
				</p>
			</div>

			<!-- Col 2: Stack -->
			<div>
				<h4
					class="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4"
				>
					{t($language, "footer.stack")}
				</h4>
				<ul class="space-y-2 text-sm text-slate-400">
					<li class="flex items-center gap-2">
						<span class="w-1 h-1 bg-amber-400 rounded-full"></span>
						Python (Polars/Pandas)
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1 h-1 bg-cyan-400 rounded-full"></span>
						PostgreSQL + Supabase
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1 h-1 bg-orange-400 rounded-full"></span>
						SvelteKit + TailwindCSS
					</li>
				</ul>
			</div>

			<!-- Col 3: Links -->
			<div>
				<h4
					class="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4"
				>
					{t($language, "footer.links")}
				</h4>
				<ul class="space-y-4">
					<li>
						<a
							href="https://www.linkedin.com/in/crist%C3%B3bal-sim%C3%B3n-g%C3%B3mez/"
							target="_blank"
							class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
						>
							<svg
								class="w-5 h-5 group-hover:text-[#0077b5] transition-colors"
								fill="currentColor"
								viewBox="0 0 24 24"
								><path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/></svg
							>
							<span class="text-sm">LinkedIn</span>
						</a>
					</li>
					<li></li>
					<li>
						<a
							href="https://github.com/simonkey1/SEC"
							target="_blank"
							class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
						>
							<svg
								class="w-5 h-5 group-hover:text-white transition-colors"
								fill="currentColor"
								viewBox="0 0 24 24"
								><path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/></svg
							>
							<span class="text-sm"
								>{t($language, "nav.repo.etl")}</span
							>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/simonkey1/dashboard-sec"
							target="_blank"
							class="flex items-center gap-2 text-slate-400 hover:text-electric-cyan transition-colors group"
						>
							<svg
								class="w-5 h-5 group-hover:text-electric-cyan transition-colors"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><polyline points="16 18 22 12 16 6"
								></polyline><polyline points="8 6 2 12 8 18"
								></polyline></svg
							>
							<span class="text-sm"
								>{t($language, "nav.repo.frontend")}</span
							>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			class="container mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center"
		>
			<p class="text-xs text-slate-600">
				© 2017-2025 Cristóbal Simón. Open Source Intelligence.
			</p>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		background-color: #020617; /* slate-950 */
	}
	:global(.custom-scrollbar::-webkit-scrollbar) {
		height: 4px;
		width: 4px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-track) {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb) {
		background: var(--color-electric-cyan);
		border-radius: 10px;
		opacity: 0.5;
	}
</style>
