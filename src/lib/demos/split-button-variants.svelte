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

	/** `null` = theme default (no preset); otherwise committed look on root + trigger */
	let appliedPresetId = $state<string | null>(null);
	/** Selection from the menu + label on the primary segment (may differ until Apply) */
	let pendingPresetId = $state(stylePresets[0]!.id);

	type ResolvedStyle = Pick<StylePreset, 'rootClass' | 'actionSize' | 'triggerSize' | 'variant'>;

	const themeDefault: ResolvedStyle = {};

	const appliedStyle: ResolvedStyle = $derived(
		appliedPresetId === null
			? themeDefault
			: (stylePresets.find((p) => p.id === appliedPresetId) ?? themeDefault)
	);

	const isApplyDisabled = $derived(pendingPresetId === appliedPresetId);
</script>

<SplitButton.Root
	class={appliedStyle.rootClass}
	bind:value={pendingPresetId}
	onclick={(e) => {
		appliedPresetId = e.action;
	}}
>
	{#each stylePresets as preset (preset.id)}
		<SplitButton.Action
			value={preset.id}
			size={appliedStyle.actionSize}
			variant={appliedStyle.variant}
			disabled={isApplyDisabled}
		>
			Apply {preset.label}
		</SplitButton.Action>
	{/each}
	<SplitButton.Select>
		<SplitButton.SelectTrigger size={appliedStyle.triggerSize} variant={appliedStyle.variant} />
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
