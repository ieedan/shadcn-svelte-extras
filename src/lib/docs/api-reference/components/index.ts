import * as casing from '../../../utils/casing.ts';

// import all references
import { reference as ButtonReference } from './button-api.ts';
import { reference as ChatReference } from './chat-api.ts';
import { reference as CodeReference } from './code-api.ts';
import { reference as ColorPickerReference } from './color-picker-api.ts';
import { reference as CopyButtonReference } from './copy-button-api.ts';
import { reference as FieldSetReference } from './field-set-api.ts';
import { reference as FileDropZoneReference } from './file-drop-zone-api.ts';
import { reference as GithubButtonReference } from './github-button-api.ts';
import { reference as ImageCropperReference } from './image-cropper-api.ts';
import { reference as Ipv4addressInputReference } from './ipv4address-input-api.ts';
import { reference as LanguageSwitcherReference } from './language-switcher-api.ts';
import { reference as LightSwitchReference } from './light-switch-api.ts';
import { reference as LinkReference } from './link-api.ts';
import { reference as MeterReference } from './meter-api.ts';
import { reference as ModalReference } from './modal-api.ts';
import { reference as NlpDateInputReference } from './nlp-date-input-api.ts';
import { reference as PhoneInputReference } from './phone-input-api.ts';
import { reference as PMCommandReference } from './pm-command-api.ts';
import { reference as NumberFieldReference } from './number-field-api.ts';
import { reference as SnippetReference } from './snippet-api.ts';
import { reference as SplitButtonReference } from './split-button-api.ts';
import { reference as StarRatingReference } from './star-rating-api.ts';
import { reference as StepperReference } from './stepper-api.ts';
import { reference as TagsInputReference } from './tags-input-api.ts';
import { reference as TerminalReference } from './terminal-api.ts';
import { reference as ThemeSelectorReference } from './theme-selector-api.ts';
import { reference as TocReference } from './toc-api.ts';
import { reference as TreeViewReference } from './tree-view-api.ts';
import { reference as UnderlineTabsReference } from './underline-tabs-api.ts';
import { reference as WindowReference } from './window-api.ts';
import { reference as EmojiPickerReference } from './emoji-picker-api.ts';
import { reference as PasswordReference } from './password-api.ts';
import { reference as RenameReference } from './rename-api.ts';

export const references = [
	ButtonReference,
	ChatReference,
	CodeReference,
	ColorPickerReference,
	CopyButtonReference,
	FieldSetReference,
	FileDropZoneReference,
	GithubButtonReference,
	ImageCropperReference,
	Ipv4addressInputReference,
	LanguageSwitcherReference,
	LightSwitchReference,
	LinkReference,
	MeterReference,
	ModalReference,
	NlpDateInputReference,
	PhoneInputReference,
	PMCommandReference,
	NumberFieldReference,
	SnippetReference,
	SplitButtonReference,
	StarRatingReference,
	StepperReference,
	TagsInputReference,
	TerminalReference,
	ThemeSelectorReference,
	TocReference,
	TreeViewReference,
	UnderlineTabsReference,
	WindowReference,
	EmojiPickerReference,
	PasswordReference,
	RenameReference
];

/** Get a reference by name
 *
 * @param name `kebab-case` name of the component to get the reference for
 */
export function getReference(name: string) {
	return references.find((reference) => reference.name === casing.kebabToPascal(name));
}

export {
	ButtonReference,
	ChatReference,
	CodeReference,
	ColorPickerReference,
	CopyButtonReference,
	FieldSetReference,
	FileDropZoneReference,
	GithubButtonReference,
	ImageCropperReference,
	Ipv4addressInputReference,
	LanguageSwitcherReference,
	LightSwitchReference,
	LinkReference,
	MeterReference,
	ModalReference,
	NlpDateInputReference,
	PhoneInputReference,
	PMCommandReference,
	NumberFieldReference,
	SnippetReference,
	SplitButtonReference,
	StarRatingReference,
	StepperReference,
	TagsInputReference,
	TerminalReference,
	ThemeSelectorReference,
	TocReference,
	TreeViewReference,
	UnderlineTabsReference,
	WindowReference,
	EmojiPickerReference,
	PasswordReference,
	RenameReference
};
