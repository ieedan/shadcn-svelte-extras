---
title: "Installation"
description: "How to add and use extras in your project."
---

<script lang="ts">
	import JsrepoCommand from '$lib/components/docs/jsrepo-command.svelte';
	import Add from '$lib/components/add.svelte';
</script>

shadcn-svelte-extras uses [jsrepo](https://jsrepo.dev) to allow you to install components into your project just like in [shadcn-svelte](https://shadcn-svelte.com), but with some additional features such as semantic versioning and easy updates.

## Setup

Initialize jsrepo with shadcn-svelte-extras:

<JsrepoCommand command="execute" args={['jsrepo', 'init', '@ieedan/shadcn-svelte-extras']} />

Configure the `paths` key in your `jsrepo.config.ts` file so that components, hooks, and utils are added to the correct places:

```typescript {5-12}
import { defineConfig } from 'jsrepo';

export default defineConfig({
    registries: ['@ieedan/shadcn-svelte-extras'],
    paths: {
			ui: "$lib/components/ui",
			component: "$lib/components",
			hook: "$lib/hooks",
			action: "$lib/actions",
			util: "$lib/utils",
			lib: "$lib"
    }
});
```


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
    "repos": ["@ieedan/shadcn-svelte-extras@2.1.1"],
}
```

