import { untrack } from 'svelte';
import { useEventListener, useMutationObserver } from 'runed';

/** Use this on a vertically scrollable container to ensure that it automatically scrolls to the bottom of the content.
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 *      import { UseAutoScroll } from '$lib/hooks/use-auto-scroll.svelte';
 *
 *      let { children } = $props();
 *
 *      const autoScroll = new UseAutoScroll();
 * </script>
 *
 * <div>
 *      <div bind:this={autoScroll.ref}>
 *          {@render children?.()}
 *      </div>
 *      {#if !autoScroll.isAtBottom}
 *          <button onclick={() => autoScroll.scrollToBottom()}>
 *              Scroll To Bottom
 *          </button>
 *      {/if}
 * </div>
 * ```
 */
export class UseAutoScroll {
	#ref = $state<HTMLElement>();
	#scrollY: number = $state(0);
	#userHasScrolled = $state(false);
	private lastScrollHeight = 0;

	constructor() {
		// Position the container when the ref binds or rebinds
		$effect(() => {
			const el = this.#ref;
			if (!el) return;

			untrack(() => {
				this.lastScrollHeight = el.scrollHeight;
				el.scrollTo(0, this.#scrollY ? this.#scrollY : el.scrollHeight);
			});
		});

		useEventListener(
			() => this.#ref,
			'scroll',
			() => {
				if (!this.#ref) return;

				this.#scrollY = this.#ref.scrollTop;

				this.disableAutoScroll();
			}
		);

		useEventListener(
			() => (this.#ref ? window : null),
			'resize',
			() => {
				this.scrollToBottom(true);
			}
		);

		// should detect when something changed that affected the scroll height
		useMutationObserver(
			() => this.#ref,
			() => {
				if (!this.#ref) return;

				if (this.#ref.scrollHeight !== this.lastScrollHeight) {
					this.scrollToBottom(true);
				}

				this.lastScrollHeight = this.#ref.scrollHeight;
			},
			{ childList: true, subtree: true }
		);
	}

	set ref(ref: HTMLElement | undefined) {
		this.#ref = ref;
	}

	get ref() {
		return this.#ref;
	}

	get scrollY() {
		return this.#scrollY;
	}

	/** Checks if the container is scrolled to the bottom */
	get isAtBottom() {
		if (!this.#ref) return true;

		return this.#scrollY + this.#ref.offsetHeight >= this.#ref.scrollHeight;
	}

	/** Disables auto scrolling until the container is scrolled back to the bottom */
	disableAutoScroll() {
		if (this.isAtBottom) {
			this.#userHasScrolled = false;
		} else {
			this.#userHasScrolled = true;
		}
	}

	/** Scrolls the container to the bottom */
	scrollToBottom(auto = false) {
		if (!this.#ref) return;

		// don't auto scroll if user has scrolled
		if (auto && this.#userHasScrolled) return;

		this.#ref.scrollTo(0, this.#ref.scrollHeight);
	}
}
