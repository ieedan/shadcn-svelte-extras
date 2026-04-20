<script lang="ts">
	import * as SplitButton from '$lib/components/ui/split-button';
</script>

<SplitButton.Root>
	<SplitButton.Action value="merge">Merge Changes</SplitButton.Action>
	<SplitButton.Action value="squash">Squash and merge</SplitButton.Action>
	<SplitButton.Action value="rebase">Rebase and merge</SplitButton.Action>
	<SplitButton.Select>
		<SplitButton.SelectTrigger />
		<SplitButton.SelectContent>
			<SplitButton.SelectAction value="merge" class="flex flex-col gap-0.5">
				<span>Create a merge commit</span>
				<span class="text-muted-foreground text-xs">
					All commits from this branch will be added to the base branch via a merge commit.
				</span>
			</SplitButton.SelectAction>
			<SplitButton.SelectAction value="squash" class="flex flex-col gap-0.5">
				<span>Squash and merge</span>
				<span class="text-muted-foreground text-xs">
					The 2 commits from this branch will be combined into one commit in the base branch.
				</span>
			</SplitButton.SelectAction>
			<SplitButton.SelectAction value="rebase" class="flex flex-col gap-0.5">
				<span>Rebase this branch onto the base branch</span>
				<span class="text-muted-foreground text-xs">
					The 2 commits from this branch will be rebased and added to the base branch.
				</span>
			</SplitButton.SelectAction>
		</SplitButton.SelectContent>
	</SplitButton.Select>
</SplitButton.Root>
