import * as api from '../api-reference';
import type {
	AvatarGroupEtcPropsWithoutHTML,
	AvatarGroupRootPropsWithoutHTML
} from '$lib/components/ui/avatar-group';

const Root = api.createComponentReference<AvatarGroupRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root component of the avatar group.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the avatar group element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the avatar group.',
			type: 'Snippet'
		}),
		orientation: api.createStringUnionProp({
			type: '"vertical" | "horizontal"',
			description: 'The orientation of the avatar group',
			defaultValue: 'horizontal'
		})
	}
});

const Member = api.createComponentReference({
	name: 'Member',
	description: 'A member of the avatar group.',
	props: {},
	forwardTo: {
		name: 'bits-ui.com',
		href: 'https://bits-ui.com/docs/components/avatar#root'
	}
});

const Etc = api.createComponentReference<AvatarGroupEtcPropsWithoutHTML>({
	name: 'Etc',
	description: 'Displays a number of additional members not displayed by the avatar group.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the avatar group etc element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the avatar group etc.',
			type: 'Snippet'
		}),
		plus: api.createNumberProp({
			description: 'The plus number shown next to the avatar group',
			required: true
		})
	}
});

export const reference = {
	name: 'AvatarGroup' as const,
	components: {
		Root,
		Member,
		Etc
	}
};
