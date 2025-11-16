<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="avatar-group"/>
<Subheading>Installation</Subheading>
<Add item="avatar-group"/>
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as AvatarGroup from '$lib/components/ui/avatar-group';
\<\/script\>

<AvatarGroup.Root>
	{#each members.slice(0, 3) as member}
		<AvatarGroup.Member>
			<AvatarGroup.MemberImage/>
			<AvatarGroup.MemberFallback>CN</AvatarGroup.MemberFallback>
		</AvatarGroup.Member>
	{/each}
	<Avatar.Etc plus={members.length - 3}/>
</AvatarGroup.Root>`}
	/>
</div>
<Subheading>Vertical</Subheading>
<Demo demo="avatar-group-vertical"/>
