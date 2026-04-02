<script lang="ts" module>
	export const defaultOptions: TelInputOptions = {
		spaces: true,
		autoPlaceholder: true
	};
</script>

<script lang="ts">
	import CountrySelector from './country-selector.svelte';
	import { type PhoneInputProps } from '.';
	import { cn } from '$lib/utils.js';
	import { TelInput, countries } from 'svelte-tel-input';
	import 'svelte-tel-input/styles/flags.css';
	import type { TelInputOptions } from 'svelte-tel-input/types';

	let {
		class: className = undefined,
		defaultCountry = null,
		country = $bindable(defaultCountry),
		options = defaultOptions,
		placeholder,
		readonly = false,
		disabled = false,
		value = $bindable(''),
		valid = $bindable(true),
		detailedValue = $bindable(null),
		order = undefined,
		name = undefined,
		...rest
	}: PhoneInputProps = $props();

	let el: HTMLInputElement | undefined = $state();

	function focus() {
		// sort of an after update kinda thing
		setTimeout(() => {
			el?.focus();
		}, 0);
	}
</script>

<div class="flex place-items-center">
	<CountrySelector {order} {countries} bind:selected={country} onselect={focus} />
	<TelInput
		{name}
		bind:country
		bind:detailedValue
		bind:value
		bind:valid
		{readonly}
		{disabled}
		{placeholder}
		bind:el
		{options}
		class={cn(
			'border-input border-l-none bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-8 w-full min-w-0 rounded-l-none rounded-r-md border-y border-r px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
			className
		)}
		{...rest}
	/>
</div>
