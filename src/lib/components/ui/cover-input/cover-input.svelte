<script lang="ts">
	import { CurrencyInput, NumberInput } from '@projektr/ui';
	import { Hashtag } from '@projektr/icons';
	import type { CreationDialogPillProps } from './types';
	import { cn, compactCurrencyFormatter, compactNumberFormatter } from '@projektr/utils';
	import type { NumberDataType } from '$lib/components/filter/pills/number/types';

	type Props = CreationDialogPillProps<number> & {
		dataType: NumberDataType | 'percent';
		min?: number;
		max?: number;
		placeholder?: string;
	};

	let {
		value = $bindable(0),
		icon: Icon,
		name,
		dataType,
		min,
		max,
		disabled,
		valid = true,
		placeholder,
	}: Props = $props();

	let open = $state(false);

	function handleOpen() {
		if (open) return;

		open = true;
		inputRef?.focus();
	}

	function handleClose() {
		if (!open) return;
		open = false;
		triggerRef?.focus();
	}

	function handleSubmit() {
		value = temporaryValue;
		handleClose();
	}

	let triggerRef = $state<HTMLButtonElement | null>(null);
	let inputRef = $state<HTMLInputElement | null>(null);

	let temporaryValue = $derived(value);
</script>

<svelte:window
	onclick={(e) => {
		if (!open) return;
		if (!e.target) {
			handleClose();
			return;
		}

		if ('closest' in e.target && typeof e.target.closest === 'function') {
			if (e.target.closest('[data-number-pill-trigger]')) {
				return;
			}

			if (e.target.closest('[data-number-pill-popover]')) {
				return;
			}

			handleClose();
		}
	}}
/>

<div class="relative" style="--trigger-width: {triggerRef?.offsetWidth}px">
	<button
		data-number-pill-trigger
		type="button"
		class="bg-background-subdued focus:ring-ring data-[invalid=true]:focus:ring-destructive ring-offset-background border-background-subdued data-[invalid=true]:border-destructive flex h-5 rounded-md border text-xs leading-4 font-medium ring-offset-2 select-none focus:ring-2 focus:outline-none"
		bind:this={triggerRef}
		onclick={handleOpen}
		{disabled}
		data-invalid={!valid ||
			(min !== undefined && value < min) ||
			(max !== undefined && value > max)}
	>
		<div class="flex h-full place-items-center gap-1 px-1.5 [&>svg]:size-4">
			{#if Icon}
				<Icon />
			{:else}
				<Hashtag />
			{/if}
			{name}
		</div>
		<div
			class="bg-background border-border flex h-full place-items-center rounded-r-md border-l px-1.5"
		>
			{#if dataType === 'currency'}
				{compactCurrencyFormatter.format(value)}
			{:else if dataType === 'percent'}
				{compactNumberFormatter.format(value)}{dataType === 'percent' ? '%' : ''}
			{/if}
		</div>
	</button>
	<div
		data-number-pill-popover
		class={cn(
			'pointer-events-none absolute top-0 left-1/2 w-(--trigger-width) -translate-x-1/2 -translate-y-1/4 scale-50 opacity-0 transition-all',
			open && 'pointer-events-auto scale-100 opacity-100'
		)}
	>
		{#if dataType === 'currency'}
			<CurrencyInput.Root
				bind:ref={inputRef}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.stopPropagation();
						e.preventDefault();
						handleSubmit();
					}

					if (e.key === 'Escape') {
						e.stopPropagation();
						handleClose();
					}
				}}
				id="to"
				{placeholder}
				bind:value={temporaryValue}
				{min}
				{max}
			/>
		{:else}
			<NumberInput.Root
				bind:ref={inputRef}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.stopPropagation();
						e.preventDefault();
						handleSubmit();
					}

					if (e.key === 'Escape') {
						e.stopPropagation();
						handleClose();
					}
				}}
				id="to"
				{placeholder}
				bind:value={temporaryValue}
				{min}
				{max}
			/>
		{/if}
	</div>
</div>
