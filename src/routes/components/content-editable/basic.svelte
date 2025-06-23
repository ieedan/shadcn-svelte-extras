<script lang="ts">
	import * as ContentEditable from '$lib/components/ui/content-editable';
</script>

<ContentEditable.Root this="h1" onValueCommit={(v) => console.log(v)} value="something" />
