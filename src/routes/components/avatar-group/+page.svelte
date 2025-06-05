<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
	import { AvatarGroupReference } from '$lib/docs/api-reference/components';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/avatar-group" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as AvatarGroup from '$lib/components/ui/link';
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
<Playground code={examples.vertical.code}>
	<examples.vertical.Component />
</Playground>
<ApiReference name="Avatar" components={AvatarGroupReference} />
