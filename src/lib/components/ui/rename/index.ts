import Root from './rename.svelte';
import Provider from './rename-provider.svelte';
import Cancel from './rename-cancel.svelte';
import Save from './rename-save.svelte';
import Edit from './rename-edit.svelte';

/**
 * This can be consumed one of two ways:
 * ```svelte
 * <script lang="ts">
 *  import { Rename } from '$lib/components/ui/rename';
 * </script>
 *
 * <Rename ... />
 * ```
 *
 * or
 *
 * ```svelte
 * <script lang="ts">
 *  import * as Rename from '$lib/components/ui/rename';
 * </script>
 *
 * <Rename.Provider>
 *  <Rename.Root ... />
 *  <Rename.Cancel/>
 *  <Rename.Save/>
 *  <Rename.Edit/>
 * </Rename.Provider>
 * ```
 */

export { Root as Rename, Provider, Root, Cancel, Save, Edit };
