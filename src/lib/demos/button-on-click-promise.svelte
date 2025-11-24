<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { sleep } from '$lib/utils/sleep';

	async function work() {
		await sleep(1000);
	}
</script>

<Button onClickPromise={work}>Save</Button>
