<script lang="ts">
	import * as Filters from '$lib/components/ui/filters';
	import { FilteredTable } from '$lib/components/ui/filtered-table';
	import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import {
		FILTER_OPERATORS_MAP,
		NumberFilterFactory,
		StringFilterFactory,
		IdFilterFactory,
		BooleanFilterFactory,
		DateFilterFactory,
		type BooleanFilter,
		type DateFilter,
		type FilterOperator,
		type IdFilter,
		type NumberFilter,
		type StringFilter
	} from '$lib/components/ui/filters/types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import type { DateRange } from 'bits-ui';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import XIcon from '@lucide/svelte/icons/x';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HashIcon from '@lucide/svelte/icons/hash';
	import TypeIcon from '@lucide/svelte/icons/type';
	import ToggleLeftIcon from '@lucide/svelte/icons/toggle-left';
	import FingerprintIcon from '@lucide/svelte/icons/fingerprint-pattern';
	import { cn } from '$lib/utils';

	let filters = $state<Filters.FilterList>([
		{
			type: 'number',
			name: 'points',
			id: '1',
			operator: '>=',
			value: 3
		}
	]);

	// the people tasks can be assigned to, an id filter lets you pick one by name but filters on the id
	const people = [
		{ id: 1, name: 'Ada Lovelace' },
		{ id: 2, name: 'Grace Hopper' },
		{ id: 3, name: 'Linus Torvalds' },
		{ id: 4, name: 'Alan Turing' },
		{ id: 5, name: 'Margaret Hamilton' },
		{ id: 6, name: 'Dennis Ritchie' },
		{ id: 7, name: 'Barbara Liskov' },
		{ id: 8, name: 'Ken Thompson' }
	];

	const peopleById = new Map(people.map((person) => [person.id, person.name]));

	const factories = {
		points: new NumberFilterFactory('points'),
		title: new StringFilterFactory('title'),
		assigneeId: new IdFilterFactory(
			'assigneeId',
			people.map((person) => ({ id: person.id, label: person.name }))
		),
		completed: new BooleanFilterFactory('completed'),
		// the ids here are resolved by the table (see `DEFAULT_RELATIVE_DATES`)
		createdAt: new DateFilterFactory('createdAt', [
			{ id: 'today', label: 'Today' },
			{ id: 'yesterday', label: 'Yesterday' },
			{ id: 'last-7-days', label: 'Last 7 days' },
			{ id: 'last-30-days', label: 'Last 30 days' },
			{ id: 'this-month', label: 'This month' },
			{ id: 'last-month', label: 'Last month' },
			{ id: 'this-year', label: 'This year' }
		])
	};

	const verbs = ['Fix', 'Refactor', 'Document', 'Test', 'Design', 'Review', 'Deploy', 'Profile'];
	const subjects = [
		'login flow',
		'billing page',
		'search index',
		'email templates',
		'onboarding',
		'settings panel',
		'API rate limits',
		'build pipeline',
		'notifications',
		'data export'
	];

	const now = new Date();

	// deterministic so the demo renders the same on the server and the client
	const tasks = Array.from({ length: 150 }, (_, i) => ({
		id: i + 1,
		title: `${verbs[(i + Math.floor(i / 8)) % verbs.length]} ${subjects[(i * 7) % subjects.length]}`,
		assigneeId: people[(i * 5) % people.length].id,
		points: 1 + (((i * 37 + 11) % 13) % 8),
		completed: i % 3 !== 0,
		// spread over the last ~year so the relative options have something to match
		createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((i * 11) % 400))
	}));

	function addPointsFilter() {
		filters.push(factories.points.create('>=', 3));
	}

	function addTitleFilter() {
		filters.push(factories.title.create('*a*', 'Fix'));
	}

	function addAssigneeFilter() {
		filters.push(factories.assigneeId.create('=', people[0].id));
	}

	function addCompletedFilter() {
		filters.push(factories.completed.create('=', true));
	}

	function addCreatedAtFilter() {
		filters.push(factories.createdAt.create('=', today(getLocalTimeZone())));
	}

	const fieldIcons = {
		number: HashIcon,
		string: TypeIcon,
		boolean: ToggleLeftIcon,
		id: FingerprintIcon,
		date: CalendarIcon
	};

	const addableFilters = [
		{ label: 'Points', icon: HashIcon, add: addPointsFilter },
		{ label: 'Title', icon: TypeIcon, add: addTitleFilter },
		{ label: 'Assignee', icon: FingerprintIcon, add: addAssigneeFilter },
		{ label: 'Completed', icon: ToggleLeftIcon, add: addCompletedFilter },
		{ label: 'Created', icon: CalendarIcon, add: addCreatedAtFilter }
	];

	/**
	 * Strips the default chrome off inputs, selects and buttons so they sit flush inside the pill as
	 * segments separated by a left divider that only show a background on hover/focus.
	 */
	const segment =
		'h-full rounded-none border-0 border-l border-border bg-transparent px-2.5 text-sm font-normal shadow-none transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:ring-0 dark:bg-transparent dark:hover:bg-accent data-[size=sm]:h-full [&>svg:last-child]:hidden';

	const operatorItems = Object.entries(FILTER_OPERATORS_MAP).map(([key, value]) => ({
		value: key,
		label: value
	}));

	function setOperator(filter: Filters.Filter, operator: string) {
		if (filter.type === 'date') {
			setDateOperator(filter, operator as DateFilter['operator']);
		} else {
			(filter as { operator: string }).operator = operator;
		}
	}

	// number

	function setNumber(filter: NumberFilter, value: number | null | undefined) {
		// an empty input is NaN, which the table treats as an incomplete filter and ignores
		filter.value = typeof value === 'number' ? value : NaN;
	}

	// boolean

	const booleanItems = [
		{ value: 'true', label: 'true' },
		{ value: 'false', label: 'false' }
	];

	function setBoolean(filter: BooleanFilter, value: string) {
		filter.value = value === 'true';
	}

	// id

	function setId(
		filter: IdFilter,
		options: { id: string | number; label: string }[],
		value: string
	) {
		// keep the id's original type (e.g. number) instead of the string the select gives us
		filter.value = options.find((option) => String(option.id) === value)?.id ?? value;
	}

	// date

	const timeZone = getLocalTimeZone();
	const formatter = new DateFormatter('en-US', { dateStyle: 'medium' });
	const formatDate = (date: DateValue) => formatter.format(date.toDate(timeZone));

	const isRangeOperator = (operator: FilterOperator) =>
		operator === 'b<=a<=c' || operator === '!b<=a<=c';

	/** Relative dates are stored as the id of the relative option instead of a date. */
	const isRelative = (filter: DateFilter) => typeof filter.value === 'string';

	const getSingleDate = (filter: DateFilter) =>
		typeof filter.value === 'string' || Array.isArray(filter.value) ? undefined : filter.value;

	function defaultDateValue(operator: FilterOperator): DateFilter['value'] {
		const current = today(timeZone);
		return isRangeOperator(operator) ? [current.subtract({ days: 6 }), current] : current;
	}

	function setDateOperator(filter: DateFilter, operator: DateFilter['operator']) {
		const shapeChanged = isRangeOperator(filter.operator) !== isRangeOperator(operator);
		filter.operator = operator;
		// A relative id works with every operator, but a single date and a range are different
		// shapes so the old value can't be carried over.
		if (!isRelative(filter) && shapeChanged) filter.value = defaultDateValue(operator);
	}

	function setDateMode(
		filter: DateFilter,
		options: { id: string | number; label: string }[],
		mode: string
	) {
		if (mode === 'relative') {
			filter.value = String(options[0].id);
		} else {
			filter.value = defaultDateValue(filter.operator);
		}
	}

	function setRelative(filter: DateFilter, id: string) {
		filter.value = id;
	}

	// An in-progress range (only the start picked) isn't a valid filter value yet, so it is held
	// here until the end is picked.
	let rangeDrafts = $state<Record<string, DateRange>>({});

	function getRange(filter: DateFilter) {
		const draft = rangeDrafts[filter.id];
		if (draft) return draft;
		const [start, end] = Array.isArray(filter.value) ? filter.value : [undefined, undefined];
		return { start, end };
	}

	function setRange(filter: DateFilter, range: DateRange) {
		if (range.start && range.end) {
			filter.value = [range.start, range.end];
			delete rangeDrafts[filter.id];
		} else {
			rangeDrafts[filter.id] = range;
		}
	}

	function dateModeLabel(filter: DateFilter) {
		if (isRelative(filter)) return 'relative';
		return isRangeOperator(filter.operator) ? 'range' : 'date';
	}
</script>

<div class="flex w-full flex-col gap-4">
	<Filters.Provider bind:filters factories={Object.values(factories)}>
		<Filters.PillList class="flex w-full flex-wrap items-center gap-2">
			{#snippet children({ filters })}
				{#each filters as filter (filter.id)}
					{@const FieldIcon = fieldIcons[filter.type]}
					<!-- the pill is one bordered container, each part is a borderless segment inside it -->
					<Filters.Pill
						class="bg-background flex h-8 items-stretch overflow-hidden rounded-md border text-sm shadow-xs"
						{filter}
					>
						{#snippet children({ operators, valueOptions })}
							<!-- field name -->
							<span class="bg-muted/40 flex items-center gap-1.5 px-2.5 font-medium">
								<FieldIcon class="text-muted-foreground size-3.5" />
								{filter.name}
							</span>

							<!-- operator -->
							<Select.Root
								type="single"
								bind:value={() => filter.operator, (value) => setOperator(filter, value)}
								items={operatorItems}
							>
								<Select.Trigger size="sm" class={cn(segment, 'text-muted-foreground')}>
									<Select.Value />
								</Select.Trigger>
								<Select.Content>
									{#each operators as operator (operator)}
										<Select.Item value={operator}>{FILTER_OPERATORS_MAP[operator]}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>

							<!-- value  -->
							{#if filter.type === 'number'}
								<Input
									type="number"
									class={cn(segment, 'w-24 font-mono')}
									bind:value={
										() => (Number.isNaN(filter.value) ? undefined : filter.value),
										(value) => setNumber(filter, value as number | null | undefined)
									}
								/>
							{:else if filter.type === 'string'}
								<Input
									class={cn(segment, 'w-40')}
									placeholder="Value"
									bind:value={() => filter.value, (value) => (filter.value = value ?? '')}
								/>
							{:else if filter.type === 'boolean'}
								<Select.Root
									type="single"
									bind:value={() => String(filter.value), (value) => setBoolean(filter, value)}
									items={booleanItems}
								>
									<Select.Trigger size="sm" class={segment}>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{#each booleanItems as item (item.value)}
											<Select.Item value={item.value}>{item.label}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{:else if filter.type === 'id' && valueOptions}
								<Select.Root
									type="single"
									bind:value={
										() => String(filter.value), (value) => setId(filter, valueOptions, value)
									}
									items={valueOptions.map((option) => ({
										value: String(option.id),
										label: option.label
									}))}
								>
									<Select.Trigger size="sm" class={segment}>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{#each valueOptions as option (option.id)}
											<Select.Item value={String(option.id)}>{option.label}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{:else if filter.type === 'date'}
								{@const dateFilter = filter}
								<!-- mode: simple date, date range (set by the operator) or relative -->
								{#if valueOptions?.length}
									<Select.Root
										type="single"
										bind:value={
											() => dateModeLabel(dateFilter),
											(value) => setDateMode(dateFilter, valueOptions, value)
										}
										items={[
											{
												value: isRangeOperator(dateFilter.operator) ? 'range' : 'date',
												label: isRangeOperator(dateFilter.operator) ? 'date range' : 'date'
											},
											{ value: 'relative', label: 'relative' }
										]}
									>
										<Select.Trigger size="sm" class={cn(segment, 'text-muted-foreground')}>
											<Select.Value />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value={isRangeOperator(dateFilter.operator) ? 'range' : 'date'}>
												{isRangeOperator(dateFilter.operator) ? 'date range' : 'date'}
											</Select.Item>
											<Select.Item value="relative">relative</Select.Item>
										</Select.Content>
									</Select.Root>
								{/if}

								{#if isRelative(dateFilter) && valueOptions}
									<Select.Root
										type="single"
										bind:value={
											() => String(dateFilter.value), (value) => setRelative(dateFilter, value)
										}
										items={valueOptions.map((option) => ({
											value: String(option.id),
											label: option.label
										}))}
									>
										<Select.Trigger size="sm" class={segment}>
											<Select.Value />
										</Select.Trigger>
										<Select.Content>
											{#each valueOptions as option (option.id)}
												<Select.Item value={String(option.id)}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								{:else if isRangeOperator(dateFilter.operator)}
									<Popover.Root onOpenChange={(open) => !open && delete rangeDrafts[dateFilter.id]}>
										<Popover.Trigger>
											{#snippet child({ props })}
												<Button {...props} variant="ghost" size="sm" class={segment}>
													{#if Array.isArray(dateFilter.value)}
														{formatDate(dateFilter.value[0])} – {formatDate(dateFilter.value[1])}
													{/if}
												</Button>
											{/snippet}
										</Popover.Trigger>
										<Popover.Content class="w-auto p-0" align="start">
											<RangeCalendar
												bind:value={
													() => getRange(dateFilter), (value) => setRange(dateFilter, value)
												}
												numberOfMonths={2}
												captionLayout="dropdown"
											/>
										</Popover.Content>
									</Popover.Root>
								{:else}
									<Popover.Root>
										<Popover.Trigger>
											{#snippet child({ props })}
												<Button {...props} variant="ghost" size="sm" class={segment}>
													{@const date = getSingleDate(dateFilter)}
													{#if date}
														{formatDate(date)}
													{/if}
												</Button>
											{/snippet}
										</Popover.Trigger>
										<Popover.Content class="w-auto p-0" align="start">
											<Calendar
												type="single"
												captionLayout="dropdown"
												bind:value={
													() => getSingleDate(dateFilter),
													(value) => value && (dateFilter.value = value)
												}
											/>
										</Popover.Content>
									</Popover.Root>
								{/if}
							{/if}

							<Filters.PillRemoveButton
								variant="ghost"
								size="sm"
								aria-label="Remove filter"
								class="text-muted-foreground hover:bg-destructive/10 hover:text-destructive border-border h-full w-8 rounded-none border-0 border-l px-0"
							>
								<XIcon />
							</Filters.PillRemoveButton>
						{/snippet}
					</Filters.Pill>
				{/each}

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								size="sm"
								class="text-muted-foreground border-dashed"
							>
								<PlusIcon /> Add filter
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start">
						{#each addableFilters as item (item.label)}
							<DropdownMenu.Item onSelect={item.add}>
								<item.icon />
								{item.label}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				{#if filters.length > 0}
					<Filters.ClearButton variant="ghost" size="sm" class="text-muted-foreground">
						Clear all
					</Filters.ClearButton>
				{/if}
			{/snippet}
		</Filters.PillList>
	</Filters.Provider>

	<FilteredTable
		class="w-full"
		data={tasks}
		{filters}
		pageSize={10}
		rowKey={(row) => row.id}
		columns={[
			{ key: 'id', header: 'ID' },
			{ key: 'title', header: 'Title' },
			{ key: 'assigneeId', header: 'Assignee', cell: assignee },
			{ key: 'points', header: 'Points' },
			{ key: 'completed', header: 'Completed', cell: completed },
			{ key: 'createdAt', header: 'Created', cell: created }
		]}
	/>
</div>

{#snippet assignee({ value }: { value: unknown })}
	{peopleById.get(value as number)}
{/snippet}

{#snippet completed({ value }: { value: unknown })}
	{value ? 'Yes' : 'No'}
{/snippet}

{#snippet created({ value }: { value: unknown })}
	{(value as Date).toLocaleDateString()}
{/snippet}
