import Root from './avatar-group.svelte';
import Member from './avatar-group-member.svelte';
import Etc from './avatar-group-etc.svelte';

import { Fallback, Image } from '$lib/components/ui/avatar';

export { Root, Member, Etc, Image as MemberImage, Fallback as MemberFallback };

export type * from './types';
