import * as casing from '$lib/utils/casing';

// import all references
import { reference as AvatarGroupReference } from './avatar-group-api';
import { reference as ButtonReference } from './button-api';
import { reference as ChatReference } from './chat-api';
import { reference as CodeReference } from './code-api';
import { reference as CopyButtonReference } from './copy-button-api';
import { reference as FieldSetReference } from './field-set-api';
import { reference as FileDropZoneReference } from './file-drop-zone-api';
import { reference as ImageCropperReference } from './image-cropper-api';
import { reference as Ipv4addressInputReference } from './ipv4address-input-api';
import { reference as KbdReference } from './kbd-api';
import { reference as LanguageSwitcherReference } from './language-switcher-api';
import { reference as LightSwitchReference } from './light-switch-api';
import { reference as LinkReference } from './link-api';
import { reference as ModalReference } from './modal-api';
import { reference as NlpDateInputReference } from './nlp-date-input-api';
import { reference as PhoneInputReference } from './phone-input-api';
import { reference as PMCommandReference } from './pm-command-api';
import { reference as SnippetReference } from './snippet-api';
import { reference as StarRatingReference } from './star-rating-api';
import { reference as TagsInputReference } from './tags-input-api';
import { reference as TerminalReference } from './terminal-api';
import { reference as ThemeSelectorReference } from './theme-selector-api';
import { reference as TocReference } from './toc-api';
import { reference as TreeViewReference } from './tree-view-api';
import { reference as WindowReference } from './window-api';
import { reference as EmojiPickerReference } from './emoji-picker-api';
import { reference as PasswordReference } from './password-api';

export const references = [
	AvatarGroupReference,
	ButtonReference,
	ChatReference,
	CodeReference,
	CopyButtonReference,
	FieldSetReference,
	FileDropZoneReference,
	ImageCropperReference,
	Ipv4addressInputReference,
	KbdReference,
	LanguageSwitcherReference,
	LightSwitchReference,
	LinkReference,
	ModalReference,
	NlpDateInputReference,
	PhoneInputReference,
	PMCommandReference,
	SnippetReference,
	StarRatingReference,
	TagsInputReference,
	TerminalReference,
	ThemeSelectorReference,
	TocReference,
	TreeViewReference,
	WindowReference,
	EmojiPickerReference,
	PasswordReference
];

/** Get a reference by name
 *
 * @param name `kebab-case` name of the component to get the reference for
 */
export function getReference(name: string) {
	return references.find((reference) => reference.name === casing.kebabToPascal(name));
}

export {
	AvatarGroupReference,
	ButtonReference,
	ChatReference,
	CodeReference,
	CopyButtonReference,
	FieldSetReference,
	FileDropZoneReference,
	ImageCropperReference,
	Ipv4addressInputReference,
	KbdReference,
	LanguageSwitcherReference,
	LightSwitchReference,
	LinkReference,
	ModalReference,
	NlpDateInputReference,
	PhoneInputReference,
	PMCommandReference,
	SnippetReference,
	StarRatingReference,
	TagsInputReference,
	TerminalReference,
	ThemeSelectorReference,
	TocReference,
	TreeViewReference,
	WindowReference,
	EmojiPickerReference,
	PasswordReference
};
