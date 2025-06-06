<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils/utils';
	import { SmilePlusIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let emoji = $state<string>('');
</script>

<EmojiPicker.Root bind:value={emoji} onSelect={(emoji) => toast.success(`You selected ${emoji}!`)}>
	<Popover.Root>
		<Popover.Trigger class={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
			{#if emoji === ''}
				<SmilePlusIcon />
			{:else}
				{emoji}
			{/if}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<EmojiPicker.Picker />
		</Popover.Content>
	</Popover.Root>
</EmojiPicker.Root>
