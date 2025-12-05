<script lang="ts">
	import { NLPDateInput } from '$lib/components/ui/nlp-date-input';
	import { toast } from 'svelte-sonner';
</script>

<div class="flex w-full max-w-xl items-center justify-center">
	<div class="h-72 w-full py-6">
		<NLPDateInput
			locale="fr"
			placeholder={'E.g. "demain à 17h" ou "dans 2 heures"'}
			onChoice={({ date, display }) =>
				toast.success(display, {
					description: `${date.toDateString()} ${date.toLocaleTimeString()}`
				})}
		/>
	</div>
</div>
