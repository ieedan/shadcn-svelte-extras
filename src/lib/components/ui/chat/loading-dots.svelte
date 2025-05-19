<script lang="ts">
	type Props = {
		size?: number;
	};

	let { size = 4 }: Props = $props();
</script>

<div style:--loading-dots-size="{size}px" class="inline-flex items-center gap-1">
	{#each { length: 3 } as _, i (i)}
		<span class="inline-block size-(--loading-dots-size) rounded-full bg-primary"></span>
	{/each}
</div>

<style>
	span {
		animation-name: loading-dots;
		animation-duration: 1.4s;
		animation-iteration-count: infinite;
		animation-fill-mode: both;
	}

	span:nth-of-type(2) {
		animation-delay: 0.2s;
	}

	span:nth-of-type(3) {
		animation-delay: 0.4s;
	}

	@keyframes loading-dots {
		0% {
			opacity: 0.2;
		}
		20% {
			opacity: 1;
		}
		to {
			opacity: 0.2;
		}
	}
</style>
