<script lang="ts">
	import { NLPDateInput } from '$lib/components/ui/nlp-date-input';
	import { toast } from 'svelte-sonner';
</script>

<div class="h-72 w-full py-6">
	<NLPDateInput
		onChoice={({ date, label }) =>
			toast.success(label, {
				description: `${date.toDateString()} ${date.toLocaleTimeString()}`
			})}
	/>
</div>
