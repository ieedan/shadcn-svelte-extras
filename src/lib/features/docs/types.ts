import type { gettingStarted } from '$content/index.js';
import type { Component } from 'svelte';

export type Doc = (typeof gettingStarted)[number];

export type CurrentDoc = {
	doc: Doc;
	next: Doc | null;
	prev: Doc | null;
	component: Component;
};
