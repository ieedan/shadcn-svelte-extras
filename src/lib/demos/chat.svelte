<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import * as Popover from '$lib/components/ui/popover';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import InfoIcon from '@lucide/svelte/icons/info';
	import PhoneIcon from '@lucide/svelte/icons/phone';
	import SendIcon from '@lucide/svelte/icons/send';
	import SmilePlusIcon from '@lucide/svelte/icons/smile-plus';
	import VideoIcon from '@lucide/svelte/icons/video';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils.js';

	type User = {
		id: string;
		username: string;
		name: string;
		img: string;
	};

	type Message = {
		senderId: string;
		message: string;
		sentAt: string;
	};

	const formatShortTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	};

	const initials = (name: string) =>
		name
			.split(' ')
			.map((n) => n[0])
			.join('');

	const firstMessageMinutesAgo = 25;
	const now = new Date();
	const baseTime = new Date(now.getTime() - firstMessageMinutesAgo * 60000);

	const user: User = {
		id: '123456',
		name: 'Jane Doe',
		username: '@janedoe',
		img: 'https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350'
	};

	const friend: User = {
		id: '654321',
		name: 'John Doe',
		username: '@johndoe',
		img: 'https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=35'
	};

	const users = [user, friend];

	const initialMessages: Message[] = [
		{
			senderId: '123456',
			message: 'Hey, did you see Svelte 5 just got released?',
			sentAt: formatShortTime(new Date(baseTime.getTime()))
		},
		{
			senderId: '654321',
			message: 'Yes! The runes system looks really interesting!',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 3 * 60000))
		},
		{
			senderId: '123456',
			message: 'Right? Such a big change from the previous reactive system',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 5 * 60000))
		},
		{
			senderId: '654321',
			message: 'Have you tried migrating any projects to it yet?',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 8 * 60000))
		},
		{
			senderId: '123456',
			message: 'Just started with a small one. The migration guide is super helpful',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 10 * 60000))
		},
		{
			senderId: '654321',
			message: 'Any breaking changes causing issues?',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 13 * 60000))
		},
		{
			senderId: '123456',
			message: 'The new $state syntax took some getting used to, but its cleaner now',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 15 * 60000))
		},
		{
			senderId: '654321',
			message: 'The performance improvements are impressive too',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 18 * 60000))
		},
		{
			senderId: '123456',
			message: 'Yeah, the compiler optimizations are amazing. Much faster now',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 20 * 60000))
		},
		{
			senderId: '654321',
			message: 'Looking forward to using it in my next project!',
			sentAt: formatShortTime(new Date(baseTime.getTime() + 23 * 60000))
		}
	];

	let message = $state('');
	const messages = $state(initialMessages);
	let open = $state(false);
</script>

<div class="border-border w-full border">
	<div class="bg-background flex place-items-center justify-between border-b p-2">
		<div class="flex place-items-center gap-2">
			<Avatar.Root>
				<Avatar.Image src={friend.img} alt={friend.username} />
				<Avatar.Fallback>
					{initials(friend.name)}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col">
				<span class="text-sm font-medium">{friend.name}</span>
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
		{#each messages as msg (msg)}
			{@const sender = users.find((u) => u.id === msg.senderId)}

			<Chat.Bubble variant={msg.senderId === user.id ? 'sent' : 'received'}>
				<Chat.BubbleAvatar>
					<Chat.BubbleAvatarImage src={sender?.img} alt={sender?.username} />
					<Chat.BubbleAvatarFallback>
						{initials(sender?.name ?? '')}
					</Chat.BubbleAvatarFallback>
				</Chat.BubbleAvatar>
				<Chat.BubbleMessage class="flex flex-col gap-1">
					<p>{msg.message}</p>
					<div class="w-full text-xs group-data-[variant='sent']/chat-bubble:text-end">
						{msg.sentAt}
					</div>
				</Chat.BubbleMessage>
			</Chat.Bubble>
		{/each}
		<Chat.Bubble variant="received">
			<Chat.BubbleAvatar>
				<Chat.BubbleAvatarImage src={friend.img} alt={friend.username} />
				<Chat.BubbleAvatarFallback>
					{initials(friend.name)}
				</Chat.BubbleAvatarFallback>
			</Chat.BubbleAvatar>
			<Chat.BubbleMessage typing />
		</Chat.Bubble>
	</Chat.List>
	<form
		onsubmit={(e) => {
			e.preventDefault();

			messages.push({ message, senderId: user.id, sentAt: formatShortTime(new Date()) });

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
