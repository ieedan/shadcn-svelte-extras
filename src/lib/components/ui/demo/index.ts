import Root from './demo.svelte';
import Tabs from './demo-tabs.svelte';
import Preview from './demo-preview.svelte';
import Code from './demo-code.svelte';
import ActionsGroup from './demo-actions-group.svelte';
import Fullscreen from './demo-control-fullscreen.svelte';
import ControlGroup from './demo-control-group.svelte';
import ControlGroupSeparator from './demo-control-group-separator.svelte';
import ControlSizeMobile from './demo-control-size-mobile.svelte';
import ControlSizeTablet from './demo-control-size-tablet.svelte';
import ControlSizeDesktop from './demo-control-size-desktop.svelte';
import ControlRefresh from './demo-control-refresh.svelte';

import { tv } from 'tailwind-variants';

export const controlVariants = tv({
	base: 'rounded-md data-[state=on]:bg-accent h-full text-muted-foreground transition-colors hover:text-foreground [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 px-2 hover:bg-accent'
});

export {
	Root,
	Tabs,
	Preview,
	Code,
	ActionsGroup,
	Fullscreen,
	ControlGroup,
	ControlGroupSeparator,
	ControlSizeMobile,
	ControlSizeTablet,
	ControlSizeDesktop,
	ControlRefresh,
	//
	Root as Demo,
	Tabs as DemoTabs,
	Preview as DemoPreview,
	Code as DemoCode,
	ActionsGroup as DemoActionsGroup,
	Fullscreen as DemoFullscreen,
	ControlGroup as DemoControlGroup,
	ControlGroupSeparator as DemoControlGroupSeparator,
	ControlSizeMobile as DemoControlSizeMobile,
	ControlSizeTablet as DemoControlSizeTablet,
	ControlSizeDesktop as DemoControlSizeDesktop,
	ControlRefresh as DemoControlRefresh
};
