<script lang="ts">
	export let data;
	export let connections = data.connections;
</script>

<main class="h-full bg-zinc-900 p-8">
	<div class="flex flex-col space-y-4">
		<h1 class="text-3xl font-bold text-zinc-50">Connections</h1>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm text-gray-100 rtl:text-right dark:text-gray-50">
				<thead
					class="bg-gray-50 text-xs text-gray-100 uppercase dark:bg-zinc-950/50 dark:text-gray-50"
				>
					<tr class="w-full text-zinc-100">
						<th scope="col" class="px-6 py-3"> IP </th>
						<th scope="col" class="px-6 py-3">Language</th>
						<th scope="col" class="px-6 py-3">Browser</th>
						<th scope="col" class="px-6 py-3">OS</th>
						<th scope="col" class="px-6 py-3">Device</th>
						<th scope="col" class="px-6 py-3">Engine</th>
						<th scope="col" class="px-6 py-3">Country</th>
						<th scope="col" class="px-6 py-3">Region</th>
						<th scope="col" class="px-6 py-3">City</th>
						<th scope="col" class="px-6 py-3">Location</th>
						<th scope="col" class="px-6 py-3">Organization</th>
						<th scope="col" class="px-6 py-3">Screen</th>
						<th scope="col" class="px-6 py-3">Platform</th>
						<th scope="col" class="px-6 py-3">Timezone</th>
						<th scope="col" class="px-6 py-3">Language</th>
						<th scope="col" class="px-6 py-3">Memory</th>
						<th scope="col" class="px-6 py-3">CPU Cores</th>
						<th scope="col" class="px-6 py-3">Touch support</th>
						<th scope="col" class="px-6 py-3">Logged at</th>
					</tr>
				</thead>
				<tbody>
					{#each connections as connection}
						<tr class="border-b border-gray-200 bg-white dark:border-zinc-950 dark:bg-zinc-950/25">
							<th
								scope="row"
								class="px-6 py-4 font-bold whitespace-nowrap text-gray-900 hover:underline dark:text-white"
							>
								<a href={`https://ipapi.co/${connection.ip}/json`} target="_blank"
									>{connection.ip}</a
								>
							</th>
							<td class="px-6 py-4">{connection.language}</td>
							<td class="px-6 py-4">{connection.browser}</td>
							<td class="px-6 py-4">{connection.os}</td>
							<td class="px-6 py-4">{connection.device}</td>
							<td class="px-6 py-4">{connection.engine}</td>
							<td class="px-6 py-4">{connection.country}</td>
							<td class="px-6 py-4">{connection.region}</td>
							<td class="px-6 py-4">{connection.city}</td>
							<td class="px-6 py-4">{connection.location}</td>
							<td class="px-6 py-4">{connection.org}</td>
							<td class="px-6 py-4">{connection.screen}</td>
							<td class="px-6 py-4">{connection.platform}</td>
							<td class="px-6 py-4">{connection.timezone}</td>
							<td class="px-6 py-4">{connection.language}</td>
							<td class="px-6 py-4">{connection.memory}</td>
							<td class="px-6 py-4">{connection.cpu}</td>
							<td class="px-6 py-4">{connection.touch}</td>
							<td class="px-6 py-4">{connection.logged_at}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</main>
