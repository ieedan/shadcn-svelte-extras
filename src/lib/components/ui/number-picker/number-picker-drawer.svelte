<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import NumberFlow from "@number-flow/svelte";
	import NumberPicker from "./number-picker.svelte";

	let {
		open = $bindable(false),
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		itemHeight = 40,
		visibleItems = 5,
		title = "Select number",
		description = "",
		confirmText = "OK",
		cancelText = "Cancel",
		triggerText = null as string | null,
		triggerVariant = "outline",
		animateTrigger = false,
		triggerPrefix = null as string | null,
		onConfirm,
	} = $props<{
		open?: boolean;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		itemHeight?: number;
		visibleItems?: number;
		title?: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		triggerText?: string | null;
		triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
		animateTrigger?: boolean;
		triggerPrefix?: string | null;
		onConfirm?: (value: number) => void;
	}>();

	const isDesktop = new MediaQuery("(min-width: 768px)");
	let tempValue = $state(value);

	$effect(() => {
		tempValue = value;
	});

	function handleConfirm() {
		value = tempValue;
		onConfirm?.(value);
		open = false;
	}
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: triggerVariant })}>
			{#if triggerText}
				{triggerText}
			{:else if animateTrigger}
				{#if triggerPrefix}
					<span class="mr-1">{triggerPrefix}</span>
				{/if}
				<NumberFlow value={value} locales="en-US" format={{ useGrouping: false }} aria-hidden="true" willChange />
			{:else}
				{String(value)}
			{/if}
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{title}</Dialog.Title>
				{#if description}
					<Dialog.Description>{description}</Dialog.Description>
				{/if}
			</Dialog.Header>
			<div class="grid items-start gap-4">
				<NumberPicker bind:value={tempValue} {min} {max} {step} {itemHeight} {visibleItems} animateInPicker={false} />
				<div class="flex justify-end gap-2">
					<Dialog.Close class={buttonVariants({ variant: "outline" })}>{cancelText}</Dialog.Close>
					<Button onclick={handleConfirm}>{confirmText}</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger class={buttonVariants({ variant: triggerVariant })}>
			{#if triggerText}
				{triggerText}
			{:else if animateTrigger}
				{#if triggerPrefix}
					<span class="mr-1">{triggerPrefix}</span>
				{/if}
				<NumberFlow value={value} locales="en-US" format={{ useGrouping: false }} aria-hidden="true" willChange />
			{:else}
				{String(value)}
			{/if}
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{title}</Drawer.Title>
				{#if description}
					<Drawer.Description>{description}</Drawer.Description>
				{/if}
			</Drawer.Header>
			<div class="grid items-start gap-4 px-4">
				<NumberPicker bind:value={tempValue} {min} {max} {step} {itemHeight} {visibleItems} animateInPicker={false} />
				<Button onclick={handleConfirm}>{confirmText}</Button>
			</div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close class={buttonVariants({ variant: "outline" })}>{cancelText}</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}


