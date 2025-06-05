import * as api from '../api-reference';

const Root = api.createComponentReference({
	name: 'Root',
	description: 'The root component of the modal.',
	props: {},
	forwardTo: {
		name: 'bits-ui Dialog',
		href: 'https://www.bits-ui.com/docs/components/dialog#api-reference'
	}
});

const Trigger = api.createComponentReference({
	name: 'Trigger',
	description: 'The trigger element for the modal.',
	props: {},
	forwardTo: {
		name: 'bits-ui Dialog.Trigger',
		href: 'https://www.bits-ui.com/docs/components/dialog#trigger'
	}
});

const Content = api.createComponentReference({
	name: 'Content',
	description: 'The content of the modal.',
	props: {},
	forwardTo: {
		name: 'bits-ui Dialog.Content',
		href: 'https://www.bits-ui.com/docs/components/dialog#content'
	}
});

const Footer = api.createComponentReference({
	name: 'Footer',
	description: 'The footer of the modal.',
	props: {}
});

const Header = api.createComponentReference({
	name: 'Header',
	description: 'The header of the modal.',
	props: {}
});

const Title = api.createComponentReference({
	name: 'Title',
	description: 'The title of the modal.',
	props: {},
	forwardTo: {
		name: 'bits-ui Dialog.Title',
		href: 'https://www.bits-ui.com/docs/components/dialog#title'
	}
});

const Description = api.createComponentReference({
	name: 'Description',
	description: 'The description of the modal.',
	props: {},
	forwardTo: {
		name: 'bits-ui Dialog.Description',
		href: 'https://www.bits-ui.com/docs/components/dialog#description'
	}
});

export const components = {
	Root,
	Trigger,
	Content,
	Footer,
	Header,
	Title,
	Description
};
