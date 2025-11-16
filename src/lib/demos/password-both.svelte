<script lang="ts">
	import * as Password from '$lib/components/ui/password';
	import * as Toggle from '$lib/components/ui/toggle';

	let showVisibility = $state(true);
	let showCopy = $state(true);
</script>

<div class="flex w-full max-w-3xs flex-col gap-2">
	<Password.Root>
		<Password.Input
			value="thisIsASuperLongSecretPasswordThatShouldBeUsedForTestingPurposesAndIsDefinitelyLongerThanMostTypicalPasswords1234567890"
		>
			{#if showVisibility}
				<Password.ToggleVisibility />
			{/if}
			{#if showCopy}
				<Password.Copy />
			{/if}
		</Password.Input>
	</Password.Root>
	<div class="flex w-full place-items-center justify-center gap-2">
		<Toggle.Root bind:pressed={showVisibility}>Show Visibility</Toggle.Root>
		<Toggle.Root bind:pressed={showCopy}>Show Copy</Toggle.Root>
	</div>
</div>

