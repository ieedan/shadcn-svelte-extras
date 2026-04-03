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
	import Button from '$lib/components/button.svelte';

	let tags = $state(['shadcn-svelte', 'extras']);
</script>

<div class="flex flex-col items-center gap-8">
	<div class="flex flex-col items-center gap-2 py-6 md:py-10 lg:py-20">
		<h1 class="text-center text-5xl font-medium">shadcn-svelte-extras</h1>
		<p class="text-center text-lg">
			Finish your component library with beautiful, composable components.
		</p>
		<div class="mt-2 flex place-items-center gap-2">
			<Button href="/docs/installation">Get Started</Button>
			<Button variant="ghost" href="/components">Browse Components</Button>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 container">
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
