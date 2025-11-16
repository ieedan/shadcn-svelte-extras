import type { Message, User } from './types';
import { formatShortTime } from './utils';

const firstMessageMinutesAgo = 25;

const now = new Date();
const baseTime = new Date(now.getTime() - firstMessageMinutesAgo * 60000);

export const messages: Message[] = [
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

export const user: User = {
	id: '123456',
	name: 'Jane Doe',
	username: '@janedoe',
	img: 'https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350'
};

export const friend: User = {
	id: '654321',
	name: 'John Doe',
	username: '@johndoe',
	img: 'https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=35'
};

export const users = [user, friend];
