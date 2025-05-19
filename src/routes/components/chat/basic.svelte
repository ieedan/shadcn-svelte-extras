<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { InfoIcon, PaperclipIcon, PhoneIcon, SendIcon, VideoIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import * as data from './data';
	import { formatShortTime, initials } from './utils';

	let message = $state('');

	const messages = $state(data.messages);
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
		{#each messages as message (message.sentAt)}
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
		<Button variant="ghost" size="icon" class="shrink-0 rounded-full">
			<PaperclipIcon />
		</Button>
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
