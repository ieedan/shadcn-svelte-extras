<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
</script>

<div class="flex w-full flex-col gap-4 max-w-xl">
	<PMCommand command="execute" args={['shadcn-svelte@next', 'add']} />
	<PMCommand command="add" args={['bits-ui', '-D']}/>
</div>

