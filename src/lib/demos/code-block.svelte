<script lang="ts">
	import { TypeScript } from '$lib/components/icons';
	import * as Code from '$lib/components/ui/code';

	const code = `import { defineConfig } from 'jsrepo';
    
export default defineConfig({
    // ...
});`;
</script>

<div class="w-full p-6">
	<div class="border-border rounded-lg border">
		<div class="border-border flex h-9 items-center justify-between border-b px-6">
			<div class="flex items-center gap-2">
				<TypeScript class="size-4" />
				<span class="text-sm font-medium">jsrepo.config.ts</span>
			</div>
		</div>
		<Code.Root lang="typescript" class="w-full border-none" {code} />
	</div>
</div>
