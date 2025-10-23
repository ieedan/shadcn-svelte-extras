<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import NumberFlow from "@number-flow/svelte";
	
	let {
		ref = $bindable(null),
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		class: className,
		itemHeight = 40,
		visibleItems = 5,
		animateInPicker = false,
		onValueChange,
		...restProps
	} = $props<{
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		class?: string;
		itemHeight?: number;
		visibleItems?: number;
		animateInPicker?: boolean;
		onValueChange?: (value: number) => void;
	}>();

	// Generate array of numbers within range
	const numbers = $derived(
		Array.from({ length: Math.max(0, Math.floor((max - min) / step) + 1) }, (_, i) => min + i * step)
	);

	// Calculate container height
	const containerHeight = $derived(visibleItems * itemHeight);

	// Padding so first/last item can align to the center selection line
	const spacerHeight = $derived(Math.max(0, (containerHeight - itemHeight) / 2));
	
	// Calculate scroll position based on value (scrollTop aligns with index * itemHeight)
	const scrollPosition = $derived(
		numbers.indexOf(value) >= 0
			? numbers.indexOf(value) * itemHeight
			: 0
	);

	// Handle scroll to update value
	function handleScroll(e: Event) {
		suppressEffect = true;
		if (suppressResetTimeout) clearTimeout(suppressResetTimeout);
		const target = e.target as HTMLElement;
		if (!target) return;
		
		const scrollTop = target.scrollTop;
		const index = Math.round(scrollTop / itemHeight);
		const clampedIndex = Math.max(0, Math.min(index, numbers.length - 1));
		
		if (numbers[clampedIndex] !== undefined && numbers[clampedIndex] !== value) {
			animated = true;
			value = numbers[clampedIndex];
			onValueChange?.(value);
		}

		suppressResetTimeout = setTimeout(() => {
			suppressEffect = false;
		}, 120);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
			event.preventDefault();
			const currentIndex = numbers.indexOf(value);
			const nextIndex = Math.max(0, currentIndex - 1);
			animated = true;
			value = numbers[nextIndex] ?? value;
			onValueChange?.(value);
			if (ref instanceof HTMLElement) {
				ref.scrollTo({ top: nextIndex * itemHeight, behavior: "smooth" });
			}
		} else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
			event.preventDefault();
			const currentIndex = numbers.indexOf(value);
			const nextIndex = Math.min(numbers.length - 1, currentIndex + 1);
			animated = true;
			value = numbers[nextIndex] ?? value;
			onValueChange?.(value);
			if (ref instanceof HTMLElement) {
				ref.scrollTo({ top: nextIndex * itemHeight, behavior: "smooth" });
			}
		} else if (event.key === "PageUp") {
			event.preventDefault();
			const currentIndex = numbers.indexOf(value);
			const nextIndex = Math.max(0, currentIndex - visibleItems);
			animated = true;
			value = numbers[nextIndex] ?? value;
			onValueChange?.(value);
			if (ref instanceof HTMLElement) {
				ref.scrollTo({ top: nextIndex * itemHeight, behavior: "smooth" });
			}
		} else if (event.key === "PageDown") {
			event.preventDefault();
			const currentIndex = numbers.indexOf(value);
			const nextIndex = Math.min(numbers.length - 1, currentIndex + visibleItems);
			animated = true;
			value = numbers[nextIndex] ?? value;
			onValueChange?.(value);
			if (ref instanceof HTMLElement) {
				ref.scrollTo({ top: nextIndex * itemHeight, behavior: "smooth" });
			}
		}
	}

	function selectIndex(index: number) {
		const clampedIndex = Math.max(0, Math.min(index, numbers.length - 1));
		if (ref instanceof HTMLElement) {
			animated = true;
			ref.scrollTo({ top: clampedIndex * itemHeight, behavior: "smooth" });
		}
	}

	let suppressEffect: boolean = false;
	let suppressResetTimeout: ReturnType<typeof setTimeout> | null = null;
	let animated = $state(true);

	// Scroll to selected value when it changes (only for external changes)
	$effect(() => {
		if (suppressEffect) return;
		if (ref && ref instanceof HTMLElement) {
			ref.scrollTop = scrollPosition;
		}
	});
</script>

<div
	class={cn(
		"relative flex flex-col items-center justify-center",
		className
	)}
	{...restProps}
>
	<!-- Overlay gradient for iOS-style effect -->
	<div class="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
	
	<!-- Selection highlight -->
	<div class="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-y border-primary/30 z-0 pointer-events-none" style={`height: ${itemHeight}px;`}></div>

	{#if animateInPicker}
		<!-- Animated overlay for the selected value (optional) -->
		<div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20" style={`height: ${itemHeight}px;`}>
			<NumberFlow
				value={value}
				locales="en-US"
				format={{ useGrouping: false }}
				aria-hidden="true"
				{animated}
				class="pointer-events-none text-lg font-bold"
				willChange
			/>
		</div>
	{/if}
	
	<!-- Scrollable area -->
	<div
		bind:this={ref}
		class="w-full overflow-y-auto scrollbar-hide"
		style={`height: ${containerHeight}px; scroll-snap-type: y mandatory; scroll-padding-top: ${spacerHeight}px; scroll-padding-bottom: ${spacerHeight}px;`}
		onscroll={handleScroll}
		onkeydown={handleKeyDown}
		role="listbox"
		aria-label="Number picker"
		tabindex="0"
	>
		<div class="relative" style={`padding-top: ${spacerHeight}px; padding-bottom: ${spacerHeight}px; min-height: ${containerHeight + 2 * spacerHeight}px;`}>
			{#each numbers as num, i}
				<div
					class={cn(
						"flex items-center justify-center transition-colors cursor-pointer",
						"text-foreground",
						value === num ? `text-lg font-bold ${animateInPicker ? 'text-transparent' : ''}` : "text-muted-foreground"
					)}
					style={`height: ${itemHeight}px; scroll-snap-align: center;`}
					role="option"
					aria-selected={value === num}
					tabindex="-1"
					onclick={() => selectIndex(i)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectIndex(i); } }}
				>
					{num}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
