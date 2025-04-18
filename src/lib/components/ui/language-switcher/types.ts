export interface Language {
	code: string; // Language code (e.g., 'en', 'de')
	label: string; // Display name (e.g., 'English', 'Deutsch')
}

export interface LanguageSwitcherProps {
	/** List of available languages */
	languages: Language[];

	/** Current selected language code */
	value?: string;

	/** Dropdown alignment */
	align?: 'start' | 'center' | 'end';

	/** Button variant */
	variant?: 'outline' | 'ghost';

	/** Called when the language changes */
	onChange?: (code: string) => void;

	/** CSS class name */
	class?: string;
}
