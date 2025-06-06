export type NLPDateInputProps = {
	min?: Date;
	max?: Date;
	placeholder?: string;
	onChoice?: (opts: { label: string; date: Date }) => void;
};
