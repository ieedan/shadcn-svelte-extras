import { Context } from 'runed';
import type { UseBoolean } from './hooks/use-boolean.svelte.ts';

export const commandContext = new Context<UseBoolean>('command-menu-context');
