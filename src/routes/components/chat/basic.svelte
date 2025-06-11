<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import * as Popover from '$lib/components/ui/popover';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { InfoIcon, PhoneIcon, SendIcon, SmilePlusIcon, VideoIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import * as data from './data';
	import { formatShortTime, initials } from './utils';
	import { cn } from '$lib/utils/utils';

	let message = $state('');

	const messages = $state(data.messages);

	let open = $state(false);
</script>

<div class="border-border w-full border">
	<div class="bg-background flex place-items-center justify-between border-b p-2">
		<div class="flex place-items-center gap-2">
			<Avatar.Root>
				<Avatar.Image src={data.friend.img} alt={data.friend.username} />
				<Avatar.Fallback>
					{initials(data.friend.name)}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col">
				<span class="text-sm font-medium">{data.friend.name}</span>
				<span class="text-xs">Active 2 mins ago</span>
			</div>
		</div>
		<div class="flex place-items-center">
			<Button variant="ghost" size="icon" class="rounded-full">
				<PhoneIcon />
			</Button>
			<Button variant="ghost" size="icon" class="rounded-full">
				<VideoIcon />
			</Button>
			<Button variant="ghost" size="icon" class="rounded-full">
				<InfoIcon />
			</Button>
		</div>
	</div>
	<Chat.List class="max-h-[400px]">
		{#each messages as message (message)}
			{@const sender = data.users.find((u) => u.id === message.senderId)}

			<Chat.Bubble variant={message.senderId === data.user.id ? 'sent' : 'received'}>
				<Chat.BubbleAvatar>
					<Chat.BubbleAvatarImage src={sender?.img} alt={sender?.username} />
					<Chat.BubbleAvatarFallback>
						{initials(sender?.name ?? '')}
					</Chat.BubbleAvatarFallback>
				</Chat.BubbleAvatar>
				<Chat.BubbleMessage class="flex flex-col gap-1">
					<p>{message.message}</p>
					<div class="w-full text-xs group-data-[variant='sent']/chat-bubble:text-end">
						{message.sentAt}
					</div>
				</Chat.BubbleMessage>
			</Chat.Bubble>
		{/each}
		<Chat.Bubble variant="received">
			<Chat.BubbleAvatar>
				<Chat.BubbleAvatarImage src={data.friend.img} alt={data.friend.username} />
				<Chat.BubbleAvatarFallback>
					{initials(data.friend.name)}
				</Chat.BubbleAvatarFallback>
			</Chat.BubbleAvatar>
			<Chat.BubbleMessage typing />
		</Chat.Bubble>
	</Chat.List>
	<form
		onsubmit={(e) => {
			e.preventDefault();

			messages.push({ message, senderId: data.user.id, sentAt: formatShortTime(new Date()) });

			message = '';
		}}
		class="flex place-items-center gap-2 p-2"
	>
		<EmojiPicker.Root
			showRecents
			recentsKey="emoji-picker-recents"
			disableInitialScroll
			onSelect={(selected) => {
				open = false;
				message += selected.emoji;
			}}
		>
			<Popover.Root bind:open>
				<Popover.Trigger
					class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'shrink-0 rounded-full')}
				>
					<SmilePlusIcon />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top" align="start">
					<EmojiPicker.Search />
					<EmojiPicker.List class="h-[175px]" />
					<EmojiPicker.Footer class="relative flex max-w-[232px] place-items-center gap-2 px-2">
						{#snippet children({ active })}
							<div class="flex w-[calc(100%-40px)] items-center gap-2">
								<span class="text-lg">{active?.emoji}</span>
								<span class="text-muted-foreground truncate text-xs">
									{active?.data.name}
								</span>
							</div>
							<EmojiPicker.SkinToneSelector />
						{/snippet}
					</EmojiPicker.Footer>
				</Popover.Content>
			</Popover.Root>
		</EmojiPicker.Root>
		<Input bind:value={message} class="rounded-full" placeholder="Type a message..." />
		<Button
			type="submit"
			variant="default"
			size="icon"
			class="shrink-0 rounded-full"
			disabled={message === ''}
		>
			<SendIcon />
		</Button>
	</form>
</div>
