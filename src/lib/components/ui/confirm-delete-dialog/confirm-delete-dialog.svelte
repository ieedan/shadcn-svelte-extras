<script lang="ts" module>
	class ConfirmDeleteDialogState {
		open = $state(false);
		inputText = $state('');
		options = $state<ConfirmDeleteOptions | null>(null);
		loading = $state(false);

		constructor() {
			this.confirm = this.confirm.bind(this);
			this.cancel = this.cancel.bind(this);
		}

		newConfirmation(options: ConfirmDeleteOptions) {
			this.reset();
			this.options = options;
			this.open = true;
		}

		reset() {
			this.open = false;
			this.inputText = '';
			this.options = null;
		}

		async confirm() {
			if (this.options?.input) {
				if (this.inputText !== this.options.input.confirmationText) {
					return;
				}
			}

			this.loading = true;
			await this.options?.onConfirm();
			this.loading = false;
			this.open = false;
		}

		cancel() {
			this.options?.onCancel?.();
			this.open = false;
		}
	}

	const dialogState = new ConfirmDeleteDialogState();

	export type ConfirmDeleteOptions = {
		title: string;
		description: string;
		skipConfirmation?: boolean;
		input?: {
			confirmationText: string;
		};
		confirm?: {
			text?: string;
		};
		cancel?: {
			text?: string;
		};
		onConfirm: () => Promise<unknown>;
		onCancel?: () => void;
	};

	export function confirmDelete(options: ConfirmDeleteOptions) {
		if (options.skipConfirmation) {
			options.onConfirm();
			return;
		}

		dialogState.newConfirmation(options);
	}
</script>

<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
</script>

<AlertDialog.Root bind:open={dialogState.open}>
	<AlertDialog.Content>
		<form
			onsubmit={async (e) => {
				e.preventDefault();
				await dialogState.confirm();
			}}
			class="flex flex-col gap-4"
		>
			<AlertDialog.Header>
				<AlertDialog.Title>
					{dialogState.options?.title}
				</AlertDialog.Title>
				<AlertDialog.Description>
					{dialogState.options?.description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			{#if dialogState.options?.input}
				<Input
					bind:value={dialogState.inputText}
					placeholder={`Enter \"${dialogState.options.input.confirmationText}\" to confirm.`}
				/>
			{/if}
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={dialogState.cancel}>
					{dialogState.options?.cancel?.text ?? 'Cancel'}
				</AlertDialog.Cancel>
				<AlertDialog.Action
					type="submit"
					variant="destructive"
					loading={dialogState.loading}
					disabled={dialogState.options?.input &&
						dialogState.inputText !== dialogState.options.input.confirmationText}
				>
					{dialogState.options?.confirm?.text ?? 'Delete'}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
