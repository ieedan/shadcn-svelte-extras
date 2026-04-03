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
		SignupForm,
		StepperExample
	} from '$lib/components/docs/examples';
	import { Snippet } from '$lib/components/ui/snippet';
	import SearchButton from '$lib/components/search-button.svelte';
	import ChatExample from '$lib/demos/chat.svelte';
	import { TagsInput } from '$lib/components/ui/tags-input';
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/button.svelte';

	let tags = $state(['shadcn-svelte', 'extras']);
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col items-center gap-2 lg:py-20 md:py-10 py-6">
		<h1 class="text-5xl font-bold text-center">shadcn-svelte-extras</h1>
		<p class="text-muted-foreground text-lg text-center">Finish your component library.</p>
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
			<StepperExample />
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
