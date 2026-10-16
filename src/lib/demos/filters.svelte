<script lang="ts">
	import * as Filters from '$lib/components/ui/filters';
	import {
		FILTER_OPERATORS_MAP,
		NumberFilterFactory,
		StringFilterFactory,
		IdFilterFactory,
		BooleanFilterFactory
	} from '$lib/components/ui/filters/types';
	import { Button } from '$lib/components/ui/button';
	import XIcon from '@lucide/svelte/icons/x';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';

	let filters = $state<Filters.FilterList>([
		{
			type: 'number',
			name: 'age',
			id: '1',
			operator: '=',
			value: 30
		}
	]);

	const factories = {
		age: new NumberFilterFactory('age'),
		email: new StringFilterFactory('email'),
		userId: new IdFilterFactory('userId', [
			{ id: 'user_123', label: 'User 123' },
			{ id: 'user_456', label: 'User 456' },
			{ id: 'user_789', label: 'User 789' }
		]),
		active: new BooleanFilterFactory('active')
	};

	function addAgeFilter() {
		filters.push(factories.age.create('=', 30));
	}

	function addEmailFilter() {
		filters.push(factories.email.create('*a*', 'example'));
	}

	function addUserIdFilter() {
		filters.push(factories.userId.create('=', 'user_123'));
	}

	function addActiveFilter() {
		filters.push(factories.active.create('=', true));
	}
</script>

<div class="flex w-full flex-col items-center gap-10">
	<Filters.Provider bind:filters factories={Object.values(factories)}>
		<Filters.PillList class="flex w-full flex-wrap items-center gap-2">
			{#snippet children({ filters })}
				{#each filters as filter (filter.id)}
					<Filters.Pill
						class="flex h-8 items-center gap-2 divide-x rounded-md border pl-2"
						{filter}
					>
						{#snippet children({ operators, valueOptions })}
							<!-- field name -->
							<span class={cn('pr-2')}>
								{filter.name}
							</span>

							<!-- operator -->
							<Select.Root
								type="single"
								bind:value={filter.operator}
								items={Object.entries(FILTER_OPERATORS_MAP).map(([key, value]) => ({
									value: key,
									label: value
								}))}
							>
								<Select.Trigger>
									<Select.Value />
								</Select.Trigger>
								<Select.Content>
									{#each operators as operator (operator)}
										<Select.Item value={operator}>{FILTER_OPERATORS_MAP[operator]}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>

							<!-- value  -->
							{#if valueOptions}
								<Select.Root
									type="single"
									bind:value={() => filter.value.toString(), (value) => (filter.value = value)}
									items={valueOptions.map((option) => ({
										value: option.id.toString(),
										label: option.label
									}))}
								>
									<Select.Trigger>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{#each valueOptions as option (option.id)}
											<Select.Item value={option.id.toString()}>{option.label}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{:else}
								<span class={cn('', filter.type === 'number' && 'font-mono')}>
									{filter.value}
								</span>
							{/if}
							
							<Filters.PillRemoveButton>
								<XIcon />
							</Filters.PillRemoveButton>
						{/snippet}
					</Filters.Pill>
				{/each}
				<Filters.ClearButton>
					<XIcon /> Clear all
				</Filters.ClearButton>
			{/snippet}
		</Filters.PillList>
	</Filters.Provider>

	<div class="flex items-center gap-2">
		<Button variant="outline" size="sm" onclick={addAgeFilter}>Add number filter</Button>
		<Button variant="outline" size="sm" onclick={addEmailFilter}>Add string filter</Button>
		<Button variant="outline" size="sm" onclick={addUserIdFilter}>Add id filter</Button>
		<Button variant="outline" size="sm" onclick={addActiveFilter}>Add boolean filter</Button>
	</div>
</div>
