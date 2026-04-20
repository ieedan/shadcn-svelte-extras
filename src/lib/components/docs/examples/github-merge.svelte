<script lang="ts">
	import * as SplitButton from '$lib/components/ui/split-button';
	import { Separator } from '$lib/components/ui/separator';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import CircleDashedIcon from '@lucide/svelte/icons/circle-dashed';

	let primary = $state('squash');
	let update = $state('merge');

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<div
	class="bg-card text-card-foreground relative flex flex-col overflow-hidden rounded-lg border shadow-xs"
>
	<div class="flex items-start gap-3 p-4">
		<CircleDashedIcon class="mt-0.5 size-5 shrink-0 text-green-500" />
		<div class="flex-1">
			<h3 class="text-sm font-semibold">All checks have passed</h3>
			<p class="text-muted-foreground text-xs">1 skipped, 6 successful checks</p>
		</div>
	</div>

	<Separator />

	<div class="flex items-start gap-3 p-4">
		<CircleCheckIcon class="mt-0.5 size-5 shrink-0 fill-green-500/15 text-green-500" />
		<div class="flex-1">
			<h3 class="text-sm font-semibold">No conflicts with base branch</h3>
			<p class="text-muted-foreground text-xs">
				It's <span class="text-foreground underline underline-offset-2">12 commits</span>
				behind (base commit: <code class="text-xs">28c320c</code>)
			</p>
		</div>
		<SplitButton.Root bind:value={update}>
			<SplitButton.Action
				value="merge"
				size="sm"
				variant="outline"
				onClickPromise={async () => {
					await sleep(1000);
				}}
			>
				Update branch
			</SplitButton.Action>
			<SplitButton.Action
				value="rebase"
				size="sm"
				variant="outline"
				onClickPromise={async () => {
					await sleep(1000);
				}}
			>
				Rebase branch
			</SplitButton.Action>
			<SplitButton.Select>
				<SplitButton.SelectTrigger size="sm" variant="outline" />
				<SplitButton.SelectContent class="max-w-64">
					<SplitButton.SelectGroup>
						<SplitButton.SelectAction value="merge" class="flex flex-col gap-0.5">
							<span class="font-medium">Update with merge commit</span>
							<span class="text-muted-foreground text-xs">
								The merge commit will be associated with your account.
							</span>
						</SplitButton.SelectAction>
						<SplitButton.SelectAction value="rebase" class="flex flex-col gap-0.5">
							<span class="font-medium">Update with rebase</span>
							<span class="text-muted-foreground text-xs">
								This pull request will be rebased on top of the latest changes and then force
								pushed.
							</span>
						</SplitButton.SelectAction>
					</SplitButton.SelectGroup>
				</SplitButton.SelectContent>
			</SplitButton.Select>
		</SplitButton.Root>
	</div>

	<Separator />

	<div class="flex flex-wrap items-center gap-3 p-4">
		<SplitButton.Root bind:value={primary}>
			<SplitButton.Action
				value="merge"
				onClickPromise={async () => {
					await sleep(1000);
				}}
			>
				Merge changes
			</SplitButton.Action>
			<SplitButton.Action
				value="squash"
				onClickPromise={async () => {
					await sleep(1000);
				}}
			>
				Squash and merge
			</SplitButton.Action>
			<SplitButton.Action
				value="rebase"
				onClickPromise={async () => {
					await sleep(1000);
				}}
			>
				Rebase and merge
			</SplitButton.Action>
			<SplitButton.Select>
				<SplitButton.SelectTrigger />
				<SplitButton.SelectContent class="max-w-72">
					<SplitButton.SelectGroup>
						<SplitButton.SelectAction value="merge" class="flex flex-col gap-0.5">
							<span class="font-medium">Create a merge commit</span>
							<span class="text-muted-foreground text-xs">
								All commits from this branch will be added to the base branch via a merge commit.
							</span>
						</SplitButton.SelectAction>
						<SplitButton.SelectAction value="squash" class="flex flex-col gap-0.5">
							<span class="font-medium">Squash and merge</span>
							<span class="text-muted-foreground text-xs">
								The 1 commit from this branch will be added to the base branch.
							</span>
						</SplitButton.SelectAction>
						<SplitButton.SelectAction value="rebase" class="flex flex-col gap-0.5">
							<span class="font-medium">Rebase and merge</span>
							<span class="text-muted-foreground text-xs">
								The 1 commit from this branch will be rebased and added to the base branch.
							</span>
						</SplitButton.SelectAction>
					</SplitButton.SelectGroup>
				</SplitButton.SelectContent>
			</SplitButton.Select>
		</SplitButton.Root>
		<p class="text-muted-foreground flex-1 text-xs">
			You can also merge this with the command line.
			<a href="#/" class="text-foreground underline underline-offset-2">
				View command line instructions.
			</a>
		</p>
	</div>

	<div class="text-muted-foreground flex justify-end px-4 pb-3 text-xs">
		Still in progress?&nbsp;<a href="#/" class="underline underline-offset-2">Convert to draft</a>
	</div>
</div>
