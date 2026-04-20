<script lang="ts">
	import * as SplitButton from '$lib/components/ui/split-button';
	import type { ButtonSize, ButtonVariant } from '$lib/components/ui/button';

	type StylePreset = {
		id: string;
		label: string;
		rootClass?: string;
		actionSize?: ButtonSize;
		triggerSize?: ButtonSize;
		variant?: ButtonVariant;
	};

	const stylePresets: StylePreset[] = [
		{
			id: 'github-default',
			label: 'GitHub Blue - default',
			rootClass: '[--primary-foreground:#fff] [--primary:#1F6FEB]'
		},
		{
			id: 'github-sm',
			label: 'GitHub Blue - sm',
			rootClass: '[--primary-foreground:#fff] [--primary:#1F6FEB]',
			actionSize: 'sm',
			triggerSize: 'icon-sm'
		},
		{
			id: 'github-lg',
			label: 'GitHub Blue - lg',
			rootClass: '[--primary-foreground:#fff] [--primary:#1F6FEB]',
			actionSize: 'lg',
			triggerSize: 'icon-lg'
		},
		{
			id: 'emerald',
			label: 'Emerald - default',
			rootClass: '[--primary-foreground:#fff] [--primary:#059669]'
		},
		{
			id: 'violet-xs',
			label: 'Violet - xs',
			rootClass: '[--primary-foreground:#fff] [--primary:#7c3aed]',
			actionSize: 'xs',
			triggerSize: 'icon-xs'
		},
		{
			id: 'destructive-sm',
			label: 'Destructive - sm',
			actionSize: 'sm',
			triggerSize: 'icon-sm',
			variant: 'destructive'
		},
		{
			id: 'outline',
			label: 'Outline - default',
			actionSize: 'default',
			triggerSize: 'icon',
			variant: 'outline'
		},
		{
			id: 'secondary',
			label: 'Secondary - default',
			actionSize: 'default',
			triggerSize: 'icon',
			variant: 'secondary'
		}
	];

	let selectedId = $state(stylePresets[0]!.id);

	const activeStyle = $derived(stylePresets.find((p) => p.id === selectedId) ?? stylePresets[0]!);
</script>

<SplitButton.Root class={activeStyle.rootClass} bind:value={selectedId}>
	{#each stylePresets as preset (preset.id)}
		<SplitButton.Action value={preset.id} size={preset.actionSize} variant={preset.variant}>
			{preset.label}
		</SplitButton.Action>
	{/each}
	<SplitButton.Select>
		<SplitButton.SelectTrigger size={activeStyle.triggerSize} variant={activeStyle.variant} />
		<SplitButton.SelectContent class="max-w-sm">
			<SplitButton.SelectGroup>
				{#each stylePresets as preset (preset.id)}
					<SplitButton.SelectAction value={preset.id}>
						{preset.label}
					</SplitButton.SelectAction>
				{/each}
			</SplitButton.SelectGroup>
		</SplitButton.SelectContent>
	</SplitButton.Select>
</SplitButton.Root>
