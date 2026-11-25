<script lang="ts">
	import { buttonVariants } from '#lib/components/ui/button/index.ts';
	import * as EmojiPicker from '#lib/components/ui/emoji-picker/index.ts';
	import * as Popover from '#lib/components/ui/popover/index.ts';
	import { cn } from '#lib/utils.js';
	import SmilePlusIcon from '@lucide/svelte/icons/smile-plus';
	import { toast } from 'svelte-sonner';

	let emoji = $state<string>('');

	let open = $state(false);
</script>

<EmojiPicker.Root
	disableInitialScroll
	bind:value={emoji}
	onSelect={(selected) => {
		open = false;
		toast.success(`You selected ${selected.emoji}!`);
	}}
>
	<Popover.Root bind:open>
		<Popover.Trigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
			{#if emoji === ''}
				<SmilePlusIcon />
			{:else}
				{emoji}
			{/if}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<EmojiPicker.Search />
			<EmojiPicker.List />
		</Popover.Content>
	</Popover.Root>
</EmojiPicker.Root>
