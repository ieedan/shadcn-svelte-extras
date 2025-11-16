<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import { Link } from '$lib/components/ui/link';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
</script>

<p>
	shadcn-svelte-extras was built to fill in the gaps left by the limited components provided by
	shadcn/ui by creating the rest of the primitives you may need to finish your application without
	sacrificing the composability, quality, or style of the original.
</p>
<Subheading>Not a port</Subheading>
<p>We are not a port of anything and therefore we aren't limited by anything.</p>
<p>
	While we promise to maintain compatibility with shadcn-svelte we aren't limited by an upstream
	project. If there is something that should exist that doesn't, we build it.
</p>
<Subheading>Composability</Subheading>
<p>
	Every component in shadcn-svelte-extras is designed with composability in mind. If something
	wouldn't be a default in your project we don't want to force it on you. For every component (that
	makes sense) it will be composable so that you can customize it to fit your project.
</p>
<Subheading>Quality</Subheading>
<p>
	We are committed to delivering components to the same standard as the original. They will be
	beautiful, performant, and composable.
</p>
<Accordion.Root type="single">
	<Accordion.Item value="q-1">
		<Accordion.Trigger>How compatible is this with shadcn-svelte?</Accordion.Trigger>
		<Accordion.Content>
			Our team includes contributors to shadcn-svelte and they keep up well with any changes made to
			the original.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="q-2">
		<Accordion.Trigger>Can I still install components from the CLI?</Accordion.Trigger>
		<Accordion.Content>
			Yes! shadcn-svelte-extras uses <Link href="https://jsrepo.dev" target="_blank">jsrepo</Link> which
			allows you to install components from the CLI.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="q-3">
		<Accordion.Trigger>Is it Tailwind 4 compatible?</Accordion.Trigger>
		<Accordion.Content>
			Yes! shadcn-svelte-extras has been updated to support Tailwind 4. Tailwind 3 support is
			available for versions <CodeSpan>@2.1.1</CodeSpan> and below.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
