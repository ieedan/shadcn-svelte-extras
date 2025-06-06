import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import NoLineNumbers from './no-line-numbers.svelte';
import noLineNumbersRaw from './no-line-numbers.svelte?raw';
import Variants from './variants.svelte';
import variantsRaw from './variants.svelte?raw';
import HighlightLines from './highlight-lines.svelte';
import highlightLinesRaw from './highlight-lines.svelte?raw';
import Overflow from './overflow.svelte';
import overflowRaw from './overflow.svelte?raw';
import CopyButton from './copy-button.svelte';
import copyButtonRaw from './copy-button.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	noLineNumbers: {
		code: noLineNumbersRaw,
		Component: NoLineNumbers
	},
	variants: {
		code: variantsRaw,
		Component: Variants
	},
	highlightLines: {
		code: highlightLinesRaw,
		Component: HighlightLines
	},
	overflow: {
		code: overflowRaw,
		Component: Overflow
	},
	copyButton: {
		code: copyButtonRaw,
		Component: CopyButton
	}
};

export { examples };
