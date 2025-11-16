<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Subheading>Basic</Subheading>
<Demo demo="phone-input" />
<Subheading>Installation</Subheading>
<Add item="phone-input" />
<Subheading>Default Country</Subheading>
<Demo demo="phone-input-default-country" />
<Subheading>Default Value</Subheading>
<Demo demo="phone-input-default-value" />
<Subheading>Custom Country Ordering</Subheading>
<Demo demo="phone-input-custom-ordering" />
<Subheading>Acknowledgements</Subheading>
<p>
	This component takes inspiration from
	<Link href="https://github.com/omeralpi/shadcn-phone-input" target="_blank">
		omeralpi/shadcn-phone-input
	</Link>.
</p>
