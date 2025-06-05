import * as api from '../api-reference';
import type {
	FieldSetRootPropsWithoutHTML,
	FieldSetTitlePropsWithoutHtml,
	FieldSetContentPropsWithoutHTML,
	FieldSetFooterPropsWithoutHTML
} from '$lib/components/ui/field-set/types';

const Root = api.createComponentReference<FieldSetRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root component of the field set.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the field set root element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the field set.',
			type: 'Snippet'
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive"',
			description: 'The visual style of the field set.',
			defaultValue: 'default'
		})
	}
});

const Title = api.createComponentReference<FieldSetTitlePropsWithoutHtml>({
	name: 'Title',
	description: 'The title of the field set.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the field set title element.',
			bindable: true,
			type: 'HTMLHeadingElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the field set title.',
			type: 'Snippet'
		}),
		level: api.createNumberUnionProp({
			type: '1 | 2 | 3 | 4 | 5 | 6',
			description: 'The heading level for the title.',
			defaultValue: '3'
		})
	}
});

const Content = api.createComponentReference<FieldSetContentPropsWithoutHTML>({
	name: 'Content',
	description: 'The content area of the field set.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the field set content element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the field set content.',
			type: 'Snippet'
		})
	}
});

const Footer = api.createComponentReference<FieldSetFooterPropsWithoutHTML>({
	name: 'Footer',
	description: 'The footer area of the field set.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the field set footer element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the field set footer.',
			type: 'Snippet'
		})
	}
});

export const components = {
	Root,
	Title,
	Content,
	Footer
};
