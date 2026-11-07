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

To get started you can use either `jsrepo` or `shadcn-svelte`. Both assume that you have already initialized your project using the shadcn-svelte CLI.

Extras use your project's own shadcn-svelte components, preserving your chosen style preset. Install the upstream components imported by an extra before using it, for example `pnpm dlx shadcn-svelte@latest add alert-dialog input` for `confirm-delete-dialog`. The jsrepo registry does not bundle or overwrite these upstream components.

<InstallationSetupTabs />

Once you've initialized using the CLI of your choice you can start adding extras!

Each component will have a copy-pasteable command like the one below that you can customize based on your project setup.

<Add item="button" />
