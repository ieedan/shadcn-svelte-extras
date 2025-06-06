import * as api from '../api-reference';
import type { IPv4AddressInputPropsWithoutHTML } from '$lib/components/ui/ipv4address-input/types';

const Root = api.createComponentReference<IPv4AddressInputPropsWithoutHTML>({
	description:
		'The root IPv4 address input component. Allows entry and validation of IPv4 addresses in a segmented input.',
	props: {
		separator: api.createStringUnionProp({
			type: '"." | " " | "_"',
			description: 'The separator character between octets.',
			defaultValue: '.'
		}),
		placeholder: api.createStringProp({
			description: 'An IP address placeholder (e.g., 0.0.0.0, 0_0_0_0, or 0 0 0 0).'
		}),
		value: api.createStringProp({
			description: 'The current value of the IPv4 address input.',
			bindable: true,
			defaultValue: 'null'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the root element.'
		}),
		name: api.createStringProp({
			description: 'The name attribute for the hidden input.'
		}),
		valid: api.createBooleanProp({
			description: 'Whether the current value is a valid IPv4 address.',
			bindable: true,
			defaultValue: false
		})
	}
});

export const reference = {
	name: 'Ipv4addressInput' as const,
	components: {
		Root
	}
};
