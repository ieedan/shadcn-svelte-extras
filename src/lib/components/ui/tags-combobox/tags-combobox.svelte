<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { TagsComboboxProps, TagsComboboxOption } from './types';
	import TagsComboboxTag from './tags-combobox-tag.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { untrack, tick } from 'svelte';

	const defaultValidate: TagsComboboxProps['validate'] = (val, tags) => {
		const transformed = val.trim();

		// disallow empties
		if (transformed.length === 0) return undefined;

		// disallow duplicates
		if (tags.find((t) => transformed === t)) return undefined;

		return transformed;
	};

	let {
		value = $bindable([]),
		options = [],
		placeholder,
		class: className,
		disabled = false,
		validate = defaultValidate,
		onOptionSelect,
		...rest
	}: TagsComboboxProps = $props();

	let inputValue = $state('');
	let tagIndex = $state<number>();
	let invalid = $state(false);
	let isComposing = $state(false);
	let open = $state(false);
	let inputElement = $state<HTMLInputElement>();
	let containerElement = $state<HTMLDivElement>();

	// Filter options based on input value and exclude already selected tags
	const filteredOptions = $derived(() => {
		if (!options || options.length === 0) return [];

		const searchTerm = inputValue.toLowerCase();
		return options.filter((option) => {
			// Filter out already selected tags
			if (value.includes(option.value)) return false;
			// Filter by search term
			if (searchTerm && !option.label.toLowerCase().includes(searchTerm)) return false;
			return true;
		});
	});

	$effect(() => {
		// whenever input value changes reset invalid
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		inputValue;

		untrack(() => {
			invalid = false;
		});
	});

	const enter = () => {
		if (isComposing) return;

		const validated = validate(inputValue, value);

		if (!validated) {
			invalid = true;
			return;
		}

		value = [...value, validated];
		inputValue = '';
		open = false;
	};

	const selectOption = (option: TagsComboboxOption) => {
		// Add the option value as a tag
		const validated = validate(option.value, value);

		if (validated) {
			value = [...value, validated];
			inputValue = '';
			open = false;
			onOptionSelect?.(option);

			// Refocus the input after selection
			tick().then(() => {
				inputElement?.focus();
			});
		}
	};

	const compositionStart = () => {
		isComposing = true;
	};

	const compositionEnd = () => {
		isComposing = false;
	};

	const keydown = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;

		// Handle escape to close dropdown
		if (e.key === 'Escape' && open) {
			e.preventDefault();
			open = false;
			return;
		}

		// Handle arrow down to open dropdown and focus first item
		if (e.key === 'ArrowDown' && !open && filteredOptions().length > 0) {
			e.preventDefault();
			open = true;
			return;
		}

		if (e.key === 'Enter') {
			// prevent form submit
			e.preventDefault();

			if (isComposing) return;

			// If dropdown is open and has filtered options, don't add custom tag
			if (open && filteredOptions().length > 0) {
				return;
			}

			enter();
			return;
		}

		const isAtBeginning = target.selectionStart === 0 && target.selectionEnd === 0;

		let shouldResetIndex = true;

		if (e.key === 'Backspace') {
			if (isAtBeginning) {
				e.preventDefault();

				if (tagIndex !== undefined) {
					deleteIndex(tagIndex);

					// focus previous
					const prev = tagIndex - 1;

					if (prev < 0) {
						tagIndex = undefined;
					} else {
						tagIndex = prev;
					}
				} else {
					tagIndex = value.length - 1;
				}

				shouldResetIndex = false;
			}
		}

		if (e.key === 'Delete') {
			if (isAtBeginning) {
				if (inputValue.length === 0) {
					if (tagIndex !== undefined) {
						e.preventDefault();

						deleteIndex(tagIndex);

						// stay focused on the same index unless value.length === 0
						if (value.length === 0) tagIndex = undefined;

						shouldResetIndex = false;
					}
				}
			}
		}

		// controls for tag selection
		if (isAtBeginning) {
			// left
			if (e.key === 'ArrowLeft') {
				if (tagIndex !== undefined) {
					const prev = tagIndex - 1;

					if (prev < 0) {
						tagIndex = 0;
					} else {
						tagIndex = prev;
					}
				} else {
					// set initial index
					tagIndex = value.length - 1;
				}

				shouldResetIndex = false;
			}

			// right
			// we can only move right if the value is empty
			if (inputValue.length === 0) {
				if (e.key === 'ArrowRight') {
					if (tagIndex !== undefined) {
						const next = tagIndex + 1;

						if (next > value.length - 1) {
							tagIndex = undefined;
						} else {
							tagIndex = next;
						}

						shouldResetIndex = false;
					}
				}
			}
		}

		// reset the tag index to undefined
		if (shouldResetIndex) {
			tagIndex = undefined;
		}
	};

	const deleteValue = (val: string) => {
		const index = value.findIndex((v) => val === v);

		if (index === -1) return;

		deleteIndex(index);
	};

	const deleteIndex = (index: number) => {
		value = [...value.slice(0, index), ...value.slice(index + 1)];
	};

	const blur = () => {
		tagIndex = undefined;
		// Delay closing to allow clicking on dropdown items
		setTimeout(() => {
			if (document.activeElement && !containerElement?.contains(document.activeElement)) {
				open = false;
			}
		}, 200);
	};

	const focus = () => {
		if (!disabled && filteredOptions().length > 0) {
			open = true;
		}
	};
</script>

<div bind:this={containerElement} class="relative w-full">
	<div
		class={cn(
			'border-input bg-background selection:bg-primary dark:bg-input/30 flex min-h-[36px] w-full flex-wrap place-items-center gap-1 rounded-md border py-0.5 pr-1 pl-1 disabled:opacity-50 aria-disabled:cursor-not-allowed',
			className
		)}
		aria-disabled={disabled}
	>
		{#each value as tag, i (tag)}
			<TagsComboboxTag value={tag} {disabled} onDelete={deleteValue} active={i === tagIndex} />
		{/each}
		<input
			{...rest}
			bind:this={inputElement}
			bind:value={inputValue}
			onblur={blur}
			onfocus={focus}
			oncompositionstart={compositionStart}
			oncompositionend={compositionEnd}
			{disabled}
			{placeholder}
			data-invalid={invalid}
			onkeydown={keydown}
			oninput={() => {
				// Open dropdown when typing if there are filtered options
				if (!open && filteredOptions().length > 0) {
					open = true;
				}
			}}
			class="placeholder:text-muted-foreground min-w-16 shrink grow basis-0 border-none bg-transparent px-2 outline-hidden focus:outline-hidden disabled:cursor-not-allowed data-[invalid=true]:text-red-500 md:text-sm"
		/>
	</div>
	{#if open && filteredOptions().length > 0}
		<div
			class="bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-1 w-full rounded-md border p-1 shadow-md"
		>
			<Command.Root shouldFilter={false}>
				<Command.List>
					<Command.Group>
						{#each filteredOptions() as option (option.value)}
							<Command.Item value={option.value} onSelect={() => selectOption(option)}>
								{option.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</div>
	{/if}
</div>
