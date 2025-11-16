<script lang="ts">
	import * as Code from '$lib/components/ui/code';

	const code = `export type Language = 
| 'English (US)' 
| 'English (UK)' 
| 'Español (MX)';
	
export const greet = (name: string, language: Language): string => {
	switch (language) {
		case 'English (US)':
			return \`Hello \${name}!\`
		case 'English (UK)':
			return \`Hello \${name}, mate!\` 
		case 'Español (MX)':
			return \`¡Hola \${name}!\`
	}
}`;
</script>

<div class="w-full p-6">
	<Code.Root
		lang="typescript"
		{code}
		highlight={[
			[3, 4],
			[10, 13]
		]}
	>
		<Code.CopyButton />
	</Code.Root>
</div>
