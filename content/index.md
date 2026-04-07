---
title: 'Introduction'
description: "Why we built shadcn-svelte-extras and why it's great."
---

<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Link } from '$lib/components/ui/link';
</script>

shadcn-svelte-extras was built to fill in the gaps left by the limited components provided by shadcn/ui by creating the rest of the primitives you may need to finish your application without sacrificing the composability, quality, or style of the original.

## Not a port

We are not a port of anything and therefore we aren't limited by anything.

While we promise to maintain compatibility with shadcn-svelte we aren't limited by an upstream project. If there is something that should exist that doesn't, we build it.

## Composability

Every component in shadcn-svelte-extras is designed with composability in mind. If something wouldn't be a default in your project we don't want to force it on you. For every component (that makes sense) it will be composable so that you can customize it to fit your project.

## Quality

We are committed to delivering components to the same standard as the original. They will be beautiful, performant, and composable.

<Accordion.Root type="single" class="mt-6">
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
Yes! shadcn-svelte-extras supports adding components from the CLI using both <Link href="https://jsrepo.dev">jsrepo</Link> and <Link href="https://shadcn-svelte.com/docs/cli">shadcn-svelte</Link>.
</Accordion.Content>
</Accordion.Item>
</Accordion.Root>
