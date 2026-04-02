---
title: "PMCommand"
description: "A package manager command component."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="pm-command" />

## Installation

<Add item="pm-command" />

## Commands


We use
	<Link href="https://github.com/antfu-collective/package-manager-detector" target="_blank">
		package-manager-detector
	</Link> to ensure that every package manager is properly supported. Also giving your auto-complete for
	your commands.


<Demo demo="pm-command-commands" />

## Variants

<Demo demo="pm-command-variants" />

## Overflow

<Demo demo="pm-command-overflow" />

## Persisted Package Manager


Use the runed `PersistedState` API to remember the users package manager.


<Demo demo="pm-command-persisted-pm" />

## Customize Agents


You can also customize the agents to your liking by providing your own array of agents with the
	`agents` prop.


<Demo demo="pm-command-customize-agents" />
