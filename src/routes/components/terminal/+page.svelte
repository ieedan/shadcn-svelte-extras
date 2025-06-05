<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import { examples } from './examples';
	import APIReference from '$lib/docs/api-reference/api-reference.svelte';
	import { TerminalReference } from '$lib/docs/api-reference/components';
</script>

<Playground code={examples.basic.code} replay>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/terminal" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Terminal from '$lib/components/ui/terminal';
\<\/script\>

<Terminal.Root>
	<Terminal.TypingAnimation/>
	<Terminal.AnimatedSpan/>
</Terminal.Root>`}
	/>
</div>
<p>
	You can add a delay to
	<CodeSpan>
		{`<Terminal.Root/>`}
	</CodeSpan> to delay every animation by that amount of time:
</p>
<div>
	<Code
		lang="svelte"
		highlight={[5]}
		code={`\<script lang="ts"\>
	import * as Terminal from '$lib/components/ui/terminal';
\<\/script\>

<Terminal.Root delay={250}>
	<Terminal.TypingAnimation/>
	<Terminal.AnimatedSpan/>
</Terminal.Root>`}
	/>
</div>
<p>
	You can also change the speed of all animations from
	<CodeSpan>
		{`<Terminal.Root/>`}
	</CodeSpan>:
</p>
<div>
	<Code
		lang="svelte"
		highlight={[5, 6]}
		code={`\<script lang="ts"\>
	import * as Terminal from '$lib/components/ui/terminal';
\<\/script\>

<!-- half speed -->
<Terminal.Root speed={0.5}>
	<Terminal.TypingAnimation/>
	<Terminal.AnimatedSpan/>
</Terminal.Root>`}
	/>
</div>
<Subheading>Loop</Subheading>
<p>
	You can make the terminal preview continuously loop using the
	<CodeSpan>
		{'<Terminal.Loop/>'}
	</CodeSpan> component.
</p>
<Playground code={examples.loop.code}>
	<examples.loop.Component />
</Playground>
<APIReference name="Terminal" components={TerminalReference} />
<Subheading>Acknowledgements</Subheading>
<p>
	This component was inspired by
	<Link href="https://magicui.design/docs/components/terminal" target="_blank">
		magicuidesign/magicui
	</Link>.
</p>
