---
title: 'Agents'
description: 'How to use shadcn-svelte-extras with agents'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
	import JsrepoCommand from '$lib/components/docs/jsrepo-command.svelte';
</script>

As agents continue to push development forward we have improved our documentation to make it easier for them to work with shadcn-svelte-extras.

## Providing Agents With Documentation

Most modern agents are capable of reading links, for that reason we recommend providing them with a link to the markdown documentation instead of copying the entire markdown content into your prompt.

To do this simply click the `Copy Link` button at the top of the page, or append `.md` to the end of the documentation page url.

If you want to view the markdown content of the page you can click the dropdown next to the `Copy Link` button and select `View as Markdown`.

## MCP

If you're using `jsrepo` to install shadcn-svelte-extras you can use the [jsrepo mcp](https://www.jsrepo.dev/docs/mcp).

The `jsrepo` mcp allows agents to interact with the shadcn-svelte-extras registry in ways it can't with the normal jsrepo CLI.

It gives it capabilities such as:

- Searching the registry
- Viewing component source
- Viewing component demos/examples

To setup the `jsrepo` mcp you can run the following command:

<JsrepoCommand command="execute" args={['jsrepo', 'config', 'mcp']} />