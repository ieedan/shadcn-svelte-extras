<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import type { FilterList } from '../filters/types.js';
	import { createFilterContext, matchesFilter, type UnresolvedBehavior } from './apply-filters.js';
	import type { AnyRelativeDateDefinition } from './relative-dates.js';

	type Column = {
		/** The key of the row to render in this column. */
		key: keyof T & string;
		/** The header label. Defaults to the key. */
		header?: string;
		/** Customize how the cell is rendered. */
		cell?: Snippet<[{ row: T; value: T[keyof T & string] }]>;
	};

	type Props = {
		/** The full, unfiltered dataset. */
		data: readonly T[];
		/** The filters to apply to `data`. Rows must match all of them. */
		filters?: FilterList;
		/** The columns to render. Defaults to every key of the first row. */
		columns?: Column[];
		/** A unique key for each row. Defaults to the row's index in `data`. */
		rowKey?: (row: T, index: number) => string | number;
		/**
		 * Extra relative date definitions (merged over the built-in ones by id). Pass the same
		 * definitions your date factories offer so every option the user can pick can be resolved.
		 */
		relativeDates?: AnyRelativeDateDefinition[];
		/** App settings relative date definitions can read (e.g. `fiscalYearStartMonth`). */
		config?: Record<string, unknown>;
		/** What to do with a relative date that has no definition. Defaults to `ignore`. */
		onUnresolved?: UnresolvedBehavior;
		/** The number of rows per page. */
		pageSize?: number;
		/** The current page (1-indexed). */
		page?: number;
		/** Rendered in place of the body when no rows match. */
		empty?: Snippet;
		class?: string;
	};

	let {
		data,
		filters = [],
		columns,
		rowKey,
		relativeDates,
		config,
		onUnresolved,
		pageSize = 10,
		page = $bindable(1),
		empty,
		class: className
	}: Props = $props();

	const context = $derived(
		createFilterContext({
			relativeDates,
			config,
			onUnresolved
		})
	);

	// keep the original index so the default row key stays stable as filters change
	const rows = $derived(
		data
			.map((row, index) => ({ row, index }))
			.filter(({ row }) =>
				filters.every((filter) => matchesFilter(row[filter.name], filter, context))
			)
	);

	const pageCount = $derived(Math.max(1, Math.ceil(rows.length / pageSize)));
	// clamp so the table never lands on a page that no longer exists when the filters narrow
	const currentPage = $derived(Math.min(Math.max(page, 1), pageCount));
	const start = $derived((currentPage - 1) * pageSize);
	const pageRows = $derived(rows.slice(start, start + pageSize));
	// pad short pages with blank space so the table is always the same height
	const fillerCount = $derived(rows.length === 0 ? 0 : pageSize - pageRows.length);

	/** Row height in rem, must match the `h-10` used on the rows. */
	const rowHeight = 2.5;

	const resolvedColumns = $derived<Column[]>(
		columns ??
			(data.length > 0 ? (Object.keys(data[0]) as (keyof T & string)[]) : []).map((key) => ({
				key
			}))
	);
</script>

<Table.Root class={className}>
	<Table.Header>
		<Table.Row>
			{#each resolvedColumns as column (column.key)}
				<Table.Head>{column.header ?? column.key}</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each pageRows as { row, index } (rowKey ? rowKey(row, index) : index)}
			<Table.Row class="h-10">
				{#each resolvedColumns as column (column.key)}
					<Table.Cell>
						{#if column.cell}
							{@render column.cell({ row, value: row[column.key] })}
						{:else}
							{row[column.key] ?? ''}
						{/if}
					</Table.Cell>
				{/each}
			</Table.Row>
		{:else}
			<Table.Row class="hover:bg-transparent">
				<Table.Cell
					colspan={Math.max(resolvedColumns.length, 1)}
					class="text-center"
					style="height: {pageSize * rowHeight}rem"
				>
					{#if empty}
						{@render empty()}
					{:else}
						No results.
					{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
		{#if fillerCount > 0}
			<!-- a single borderless spacer keeps the height without drawing empty rows -->
			<Table.Row class="pointer-events-none border-0 hover:bg-transparent" aria-hidden="true">
				<Table.Cell
					colspan={Math.max(resolvedColumns.length, 1)}
					class="p-0"
					style="height: {fillerCount * rowHeight}rem"
				></Table.Cell>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>

<div class="flex min-h-9 items-center justify-between gap-4 pt-4">
	<p class="text-muted-foreground text-sm whitespace-nowrap">
		{#if rows.length === 0}
			0 results
		{:else}
			Showing {start + 1}–{Math.min(start + pageSize, rows.length)} of {rows.length}
		{/if}
	</p>
	{#if pageCount > 1}
		<Pagination.Root
			count={rows.length}
			perPage={pageSize}
			bind:page={() => currentPage, (value) => (page = value)}
			class="mx-0 w-auto"
		>
			{#snippet children({ pages })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<ChevronLeftIcon class="size-4" />
							<span class="hidden sm:block">Previous</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as p (p.key)}
						{#if p.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link page={p} isActive={currentPage === p.value}>
									{p.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Next</span>
							<ChevronRightIcon class="size-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	{/if}
</div>
