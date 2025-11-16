<script lang="ts">
	import * as Add from '$lib/components/ui/add';
	import type { RegistryItem } from '$lib/registry-items';

    type Props = {
        item: RegistryItem;
        withoutRegistry?: boolean;
    };

    let { item, withoutRegistry = true }: Props = $props();
</script>

<Add.Root {item} {withoutRegistry}>
	<Add.Group>
		<Add.Button />
		<Add.GroupSeparator />
		<Add.Dropdown>
			<Add.DropdownContent>
				<Add.DropdownCopyInit />
				<Add.DropdownSeparator />
				{#each Add.AGENTS as agent (agent)}
					<Add.DropdownAgentOption {agent} />
				{/each}
				<Add.DropdownSeparator />
				<Add.DropdownDocsLink />
			</Add.DropdownContent>
		</Add.Dropdown>
	</Add.Group>
</Add.Root>
