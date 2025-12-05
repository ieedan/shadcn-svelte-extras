<script lang="ts">
	import { NLPDateInput } from '$lib/components/ui/nlp-date-input';
	import { toast } from 'svelte-sonner';
</script>

<div class="flex w-full max-w-xl items-center justify-center">
	<div class="h-72 w-full py-6">
		<NLPDateInput
			onChoice={({ refDate, text }) =>
				toast.success(text, {
					description: `${new Date(refDate).toDateString()} ${new Date(refDate).toLocaleTimeString()}`
				})}
		/>
	</div>
</div>
