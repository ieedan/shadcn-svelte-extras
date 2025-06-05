import Bubble from './chat-bubble.svelte';
import BubbleMessage from './chat-bubble-message.svelte';
import BubbleAvatar from './chat-bubble-avatar.svelte';
import List from './chat-list.svelte';
import * as Avatar from '$lib/components/ui/avatar';

const BubbleAvatarImage = Avatar.Image;
const BubbleAvatarFallback = Avatar.Fallback;

export { List, Bubble, BubbleMessage, BubbleAvatar, BubbleAvatarImage, BubbleAvatarFallback };

export type * from './types';
