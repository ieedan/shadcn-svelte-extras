<script lang="ts">
	import {
		ReviewForm,
		ConfigureDevice,
		PhoneNumberSetting,
		CodeBlock,
		EditorFileTree,
		FileDropZone,
		Terminal,
		PmCommand,
		SignupForm
	} from '$lib/components/docs/examples';
	import { Snippet } from '$lib/components/ui/snippet';
	import SearchButton from '$lib/components/search-button.svelte';
	import ChatExample from '$lib/demos/chat.svelte';
	import { TagsInput } from '$lib/components/ui/tags-input';
	import { ArrowRightIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let tags = $state(['shadcn-svelte', 'extras']);
</script>

<div class="flex flex-col gap-8 p-8">
	<div class="flex flex-col gap-2">
		<a href="/components/underline-tabs" class="flex place-items-center gap-1 text-sm font-medium">
			<span class="hover:underline"
				>New component <span class="font-bold">Underline Tabs</span>!</span
			>
			<ArrowRightIcon class="size-3.5" />
		</a>
		<h1 class="text-5xl font-bold">shadcn-svelte-extras</h1>
		<p class="text-muted-foreground text-lg">Finish your app with 20+ components and utilities.</p>
		<div class="mt-2 flex place-items-center gap-2">
			<Button href="/docs/installation" size="sm">Get Started</Button>
			<Button variant="outline" href="/components" size="sm">Browse Components</Button>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
		<div class="flex flex-col gap-4 lg:col-start-1">
			<ChatExample />
			<TagsInput bind:value={tags} placeholder="Add a tag" />
			<ReviewForm />
			<SearchButton />
			<div class="flex flex-col gap-4 2xl:hidden">
				<SignupForm />
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
			<SignupForm />
			<EditorFileTree />
		</div>
	</div>
</div>
