<script lang="ts">
	import Button from "../button/button.svelte";
	import { useContentEditableTrigger } from "./content-editable.svelte.js";

    type Props = {

    };

    let {} = $props();

    const state = useContentEditableTrigger();
</script>

<Button onclick={() => state.root.endEdit({ commit: false })} variant="outline">Cancel</Button>