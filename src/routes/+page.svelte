<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let clientInfo = {
		screen: '',
		platform: '',
		timezone: '',
		language: '',
		memory: '',
		cores: '',
		touch: ''
	};

	onMount(async () => {
		clientInfo.screen = `${window.screen.width}x${window.screen.height}`;
		clientInfo.platform = navigator.platform;
		clientInfo.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		clientInfo.language = navigator.language;

		clientInfo.memory =
			'navigator' in window && 'deviceMemory' in navigator
				? `${(navigator as any).deviceMemory} GB`
				: 'Not supported';

		clientInfo.cores = navigator.hardwareConcurrency?.toString() || 'unknown';
		clientInfo.touch = 'ontouchstart' in window ? 'Yes' : 'No';

		// Combine everything into one object
		const connectionData = {
			ip: data.ip,
			browser: `${data.ua.browser} ${data.ua.version}`,
			os: `${data.ua.os} ${data.ua.osVersion}`,
			device: data.ua.device,
			engine: data.ua.engine,

			country: data.geo?.country_name || '',
			region: data.geo?.region || '',
			city: data.geo?.city || '',
			location:
				data.geo?.latitude && data.geo?.longitude
					? `${data.geo.latitude}, ${data.geo.longitude}`
					: '',
			org: data.geo?.org || '',

			screen: clientInfo.screen,
			platform: clientInfo.platform,
			timezone: clientInfo.timezone,
			language: clientInfo.language,
			memory: clientInfo.memory,
			cpu: clientInfo.cores,
			touch: clientInfo.touch
		};

		// Send to server via form action
		const formData = new FormData();
		formData.append('combinedData', JSON.stringify(connectionData));

		await fetch('?/' + 'save', {
			method: 'POST',
			body: formData
		});
	});
</script>

<main class="flex h-screen flex-col space-y-4 bg-zinc-900 p-8">
	<h1 class="text-3xl font-bold text-zinc-50">Connections</h1>
	<div class="flex h-full w-full flex-col space-y-4 md:h-auto md:flex-row md:space-x-4">
		<div class="card flex-1 text-wrap">
			<h2 class="text-2xl font-bold">📡 Server Info</h2>
			<ul>
				<li><strong>IP:</strong> {data.ip}</li>
				<li><strong>Language:</strong> {data.language}</li>
				<li><strong>Browser:</strong> {data.ua.browser} {data.ua.version}</li>
				<li><strong>OS:</strong> {data.ua.os} {data.ua.osVersion}</li>
				<li><strong>Device:</strong> {data.ua.device}</li>
				<li><strong>Engine:</strong> {data.ua.engine}</li>
			</ul>
		</div>

		<div class="card flex-1 text-wrap">
			<h2 class="text-2xl font-bold">🌍 Geolocation Info</h2>
			{#if data.geo && !data.geo.error}
				<ul>
					<li><strong>Country:</strong> {data.geo.country_name}</li>
					<li><strong>Region:</strong> {data.geo.region}</li>
					<li><strong>City:</strong> {data.geo.city}</li>
					<li><strong>IP Location:</strong> {data.geo.latitude}, {data.geo.longitude}</li>
					<li><strong>Org:</strong> {data.geo.org}</li>
				</ul>
			{:else}
				<p>Geolocation not available.</p>
			{/if}
		</div>

		<div class="card flex-1 text-wrap">
			<h2 class="text-2xl font-bold">🖥️ Client Info</h2>
			<ul>
				<li><strong>Screen:</strong> {clientInfo.screen}</li>
				<li><strong>Platform:</strong> {clientInfo.platform}</li>
				<li><strong>Timezone:</strong> {clientInfo.timezone}</li>
				<li><strong>Language:</strong> {clientInfo.language}</li>
				<li><strong>Memory:</strong> {clientInfo.memory}</li>
				<li><strong>CPU Cores:</strong> {clientInfo.cores}</li>
				<li><strong>Touch Support:</strong> {clientInfo.touch}</li>
			</ul>
		</div>
	</div>
</main>
