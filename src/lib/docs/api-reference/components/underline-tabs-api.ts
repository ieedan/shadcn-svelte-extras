import * as api from '../api-reference';

const Root = api.createComponentReference({
	name: 'Root',
	description: 'The root component of the underline tabs.',
	props: {},
	forwardTo: {
		name: 'bits-ui Tabs.Root',
		href: 'https://www.bits-ui.com/docs/components/tabs#root'
	}
});

const List = api.createComponentReference({
	name: 'List',
	description: 'The component containing the tab triggers.',
	props: {},
	forwardTo: {
		name: 'bits-ui Tabs.List',
		href: 'https://www.bits-ui.com/docs/components/tabs#list'
	}
});

const Trigger = api.createComponentReference({
	name: 'Trigger',
	description: 'The trigger for a tab.',
	props: {},
	forwardTo: {
		name: 'bits-ui Tabs.Trigger',
		href: 'https://www.bits-ui.com/docs/components/tabs#trigger'
	}
});

const Content = api.createComponentReference({
	name: 'Content',
	description: 'The panel containing the contents of a tab.',
	props: {},
	forwardTo: {
		name: 'bits-ui Tabs.Content',
		href: 'https://www.bits-ui.com/docs/components/tabs#content'
	}
});

export const reference = {
	name: 'UnderlineTabs' as const,
	components: {
		Root,
		List,
		Trigger,
		Content
	}
};
