export const formatShortTime = (date: Date) => {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
};

export const initials = (name: string) =>
	name
		.split(' ')
		.map((n) => n[0])
		.join('');
