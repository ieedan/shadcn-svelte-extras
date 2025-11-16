import Provider from './add-provider.svelte';
import Root from './add.svelte';
import Group from './add-group.svelte';
import Button from './add-button.svelte';
import GroupSeparator from './add-group-separator.svelte';
import Dropdown from './add-dropdown.svelte';
import DropdownContent from './add-dropdown-content.svelte';
import DropdownSeparator from './add-dropdown-separator.svelte';
import DropdownAgentOption from './add-dropdown-agent-option.svelte';
import DropdownRegistryOption from './add-dropdown-registry-option.svelte';
import DropdownDocsLink from './add-dropdown-docs-link.svelte';
import DropdownCopyInit from './add-dropdown-copy-init.svelte';

import { AGENTS, type Agent } from './add.svelte.js';

export {
	Provider,
	Root,
	Button,
	Group,
	GroupSeparator,
	Dropdown,
	DropdownContent,
	DropdownSeparator,
	DropdownAgentOption,
	DropdownRegistryOption,
	DropdownDocsLink,
	DropdownCopyInit,
	//
	Provider as AddProvider,
	Root as Add,
	Button as AddButton,
	Group as AddGroup,
	GroupSeparator as AddGroupSeparator,
	Dropdown as AddDropdown,
	DropdownContent as AddDropdownContent,
	DropdownSeparator as AddDropdownSeparator,
	DropdownAgentOption as AddDropdownAgentOption,
	DropdownRegistryOption as AddDropdownRegistryOption,
	DropdownDocsLink as AddDropdownDocsLink,
	DropdownCopyInit as AddDropdownCopyInit,
	//
	AGENTS,
	type Agent
};
