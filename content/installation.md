---
title: 'Installation'
description: 'How to add and use extras in your project.'
---

<script lang="ts">
	import JsrepoCommand from '$lib/components/docs/jsrepo-command.svelte';
	import InstallationSetupTabs from '$lib/components/docs/installation-setup-tabs.svelte';
	import Add from '$lib/components/add.svelte';
</script>

shadcn-svelte-extras distributes it's components as copy-pastable code that you can use in your project just like in [shadcn-svelte](https://shadcn-svelte.com).

To get started you can use either `jsrepo` or `shadcn-svelte`.

<InstallationSetupTabs />

Start adding extras!

<Add item="button" />

## MCP

To setup the jsrepo MCP server you can run the following command:

<JsrepoCommand command="execute" args={['jsrepo', 'config', 'mcp']} />

This will configure the jsrepo MCP server for the client of your choice.

We also added a Cursor Rules config file for your convenience. You can add it when you initialize shadcn-svelte-extras with the `jsrepo init` command.

## Tailwind v3

You can still access the tailwind v3 components by using jsrepo v2 and pinning the registry version to the latest tailwind v3 compatible version:

```json
{
	"repos": ["@ieedan/shadcn-svelte-extras@2.1.1"]
}
```
