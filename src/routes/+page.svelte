<script lang="ts">
	import {
		ReviewForm,
		ConfigureDevice,
		PhoneNumberSetting,
		CodeBlock,
		EditorFileTree,
		FileDropZone,
		Terminal,
		PmCommand
	} from '$lib/components/docs/examples';
	import { Snippet } from '$lib/components/ui/snippet';
	import SearchButton from '$lib/components/search-button.svelte';
	import ChatExample from './components/chat/basic.svelte';
	import { TagsInput } from '$lib/components/ui/tags-input';
	import { ArrowRightIcon } from '@lucide/svelte';
	import { map } from '$lib/map';

	let tags = $state(['shadcn-svelte', 'extras']);

	const components = $derived(
		Array.from(Object.entries(map))
			.filter(([cat]) => cat === 'Components')
			.flatMap(([_, components]) =>
				components.map((comp, i) => `${i === components.length - 1 ? 'and ' : ''}${comp.name}`)
			)
			.join(', ')
	);
</script>

<svelte:head>
	<title>shadcn-svelte-extras</title>
	<meta
		name="description"
		content="Finish your app with awesome svelte components like {components}"
	/>
</svelte:head>

<div class="flex flex-col gap-8 p-8">
	<div class="flex flex-col gap-2">
		<a href="/docs/using-extras" class="flex place-items-center gap-1 text-sm font-medium">
			<span class="hover:underline">Now with Tailwindcss v4 support!</span>
			<ArrowRightIcon class="size-3.5" />
		</a>
		<h1 class="text-5xl font-bold">shadcn-svelte-extras</h1>
		<p class="text-muted-foreground text-lg">Finish your app.</p>
	</div>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
		<div class="flex flex-col gap-4 lg:col-start-1">
			<ChatExample />
			<TagsInput bind:value={tags} placeholder="Add a tag" />
			<ReviewForm />
			<SearchButton />
			<div class="flex flex-col gap-4 2xl:hidden">
				<EditorFileTree />
			</div>
		</div>
		<div class="flex flex-col gap-4 lg:col-start-2">
			<PhoneNumberSetting />
			<CodeBlock />
			<ConfigureDevice />
			<Snippet text="npx shadcn-svelte@next init" />
			<FileDropZone />
			<div class="flex flex-col gap-4 2xl:hidden">
				<Terminal />
				<PmCommand />
			</div>
		</div>
		<div class="hidden flex-col gap-4 2xl:col-start-3 2xl:flex">
			<Terminal />
			<PmCommand />
			<EditorFileTree />
		</div>
	</div>
</div>
