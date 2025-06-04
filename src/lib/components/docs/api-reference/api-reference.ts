import type { LooseAutocomplete } from '$lib/utils/types';

export type Component<T> = {
	name: string;
	description: string;
	props: PropsReference<T>;
	forwardTo?: {
		name: string;
		href: string;
	};
};

export type PropReference = {
	type: string;
	description: string;
	required: boolean;
	bindable?: boolean;
	defaultValue?: string;
};

export type PropsReference<T> = {
	[K in keyof T]: Omit<PropReference, 'type'> &
		(T[K] extends string
			? { type: 'string' }
			: T[K] extends number
				? { type: 'number' }
				: T[K] extends boolean
					? { type: 'boolean' }
					: { type: string });
};

export function createStringProp({
	description,
	required = false,
	bindable = false,
	defaultValue
}: {
	description: string;
	required?: boolean;
	bindable?: boolean;
	defaultValue?: string;
}) {
	return {
		type: 'string' as const,
		description,
		required,
		bindable,
		defaultValue
	} satisfies PropReference;
}

export function createNumberProp({
	description,
	required = false,
	bindable = false,
	defaultValue
}: {
	description: string;
	required?: boolean;
	bindable?: boolean;
	defaultValue?: number;
}) {
	return {
		type: 'number' as const,
		description,
		required,
		bindable,
		default: defaultValue?.toString()
	};
}

export function createBooleanProp({
	description,
	required = false,
	bindable = false,
	defaultValue
}: {
	description: string;
	required?: boolean;
	bindable?: boolean;
	defaultValue?: boolean;
}) {
	return {
		type: 'boolean' as const,
		description,
		required,
		bindable,
		defaultValue: defaultValue?.toString()
	} satisfies PropReference;
}

export function createStringUnionProp({
	type,
	description,
	required = false,
	bindable = false,
	defaultValue
}: {
	type: `"${string}" | "${string}"${string extends infer _R ? '' : ` | "${string}"`}`;
	description: string;
	required?: boolean;
	bindable?: boolean;
	defaultValue?: string;
}) {
	return {
		type: type as string,
		description,
		required,
		bindable,
		defaultValue
	} satisfies PropReference;
}

export function createFunctionProp({
	description,
	required = false
}: {
	description: string;
	required?: boolean;
}) {
	return {
		type: 'function' as const,
		description,
		required
	} satisfies PropReference;
}

export function createAnyProp({
	description,
	required = false,
	bindable = false,
	type
}: {
	type: LooseAutocomplete<'Snippet'>;
	description: string;
	required?: boolean;
	bindable?: boolean;
}) {
	return {
		type,
		description,
		required,
		bindable
	} satisfies PropReference;
}

export function createComponentReference<T extends Record<string, unknown>>({
	name,
	description,
	props,
	forwardTo
}: {
	name: string;
	description: string;
	props: PropsReference<T>;
	forwardTo?: {
		name: string;
		href: string;
	};
}) {
	return {
		name,
		description,
		props,
		forwardTo
	} satisfies Component<T>;
}
